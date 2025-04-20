import { GroupStocks } from "../types/data";
import {
  convertStringToTime,
  getDateRange,
  similaritySentence,
} from "./helper";

const MAX_PROCESS = 10;
const MAX_SETP = 10;
const MIN_SIMILARITY_SCORE = 20;
const CREAT_INSTANCE_GROUP_STOCK_COMMANEDS = [
  {
    command: "create igs this week",
    action: async () => await createInstanceGroupStock(0),
  },
  {
    command: "create igs last week",
    action: async () => await createInstanceGroupStock(1),
  },
  {
    command: "create igs last n weeks",
    action: async (name) => {
      const matches = name.match(/\d+/);
      const week = matches ? parseInt(matches[0], 10) : 0;

      return await createInstanceGroupStock(week);
    },
  },
];

export function autoCreateInstanceGroupStock(name: string): GroupStocks | null {
  let score = 0;
  let selectedCommand = null;

  CREAT_INSTANCE_GROUP_STOCK_COMMANEDS.forEach((command) => {
    const newScore = similaritySentence(name, command.command);
    console.log(name, command.command, newScore);
    if (newScore > score && newScore > MIN_SIMILARITY_SCORE) {
      score = newScore;
      selectedCommand = command;
    }
  });

  if (score === 0) return null;

  return selectedCommand.action(name);
}

async function createInstanceGroupStock(
  weeks: number,
): Promise<GroupStocks | null> {
  const [startDate, endDate] = getDateRange(weeks);
  const rawStocks = [];

  let startPageIndex = -1;
  let endPageIndex = -1;

  async function crawlerPage(pageIndex: number) {
    if (pageIndex > MAX_PROCESS * MAX_SETP) return;
    if (pageIndex > endPageIndex && endPageIndex !== -1) return;
    if (pageIndex < startPageIndex) return;

    const response = await fetch(
      `https://cafef.vn/du-lieu//Ajax/Events_RelatedNews_New.aspx?symbol=&floorID=0&configID=5&PageIndex=${pageIndex}&PageSize=30&Type=2`,
    )
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        if (!doc.querySelector("#divEvents > ul > li:first-of-type")) return;

        const pageStartDate = convertStringToTime(
          doc
            .querySelector("#divEvents > ul > li:last-of-type")
            ?.querySelector("span")?.textContent,
        );
        const pageLastDate = convertStringToTime(
          doc
            .querySelector("#divEvents > ul > li:first-of-type")
            ?.querySelector("span")?.textContent,
        );

        if (
          pageStartDate < startDate &&
          (endPageIndex > pageIndex || endPageIndex === -1)
        ) {
          endPageIndex = pageIndex;
        }

        if (
          pageLastDate > endDate &&
          (startPageIndex <= pageIndex || startPageIndex === -1)
        ) {
          startPageIndex = pageIndex;
        }

        doc.querySelectorAll("#divEvents > ul > li").forEach((li) => {
          const publicDate = convertStringToTime(
            li.querySelector("span")?.textContent,
          );

          if (publicDate < startDate || publicDate > endDate) return;

          rawStocks.push({
            publicDate,
            text: li.querySelector("a")?.textContent,
          });
        });
      });

    await crawlerPage(pageIndex + MAX_PROCESS);
  }

  const promises = Array.from({ length: MAX_PROCESS }).map((_, i) =>
    crawlerPage(i),
  );
  await Promise.all(promises);

  console.log(startPageIndex, endPageIndex, rawStocks);

  return {
    name: `igs:${startDate.getFullYear().toString().padStart(4, "0")}${(startDate.getMonth() + 1).toString().padStart(2, "0")}${startDate.getDate().toString().padStart(2, "0")}`,
    stocks: formatedGroupStocks(rawStocks),
  };
}

function formatedGroupStocks(rawStocks: any[]): Array<string> {
  return rawStocks
    .filter((stock) => stock.text.includes("mua"))
    .sort((a, b) => b.publicDate - a.publicDate)
    .map((stock) => stock.text.split(":")[0])
    .filter((value, index, self) => self.indexOf(value) === index);
}
