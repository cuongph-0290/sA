import axios from "axios";
import { CompanyStockInfo } from "../types/data";
import { DATA_HOST } from "./constant";

export async function getBusinessSector(c: CompanyStockInfo): Promise<string> {
  const response = await axios.get(`${DATA_HOST}${c.href}`);
  const regex = /<span class="subtitle" style="color:Red;">(.*?)<\/span>/g;
  const match = regex.exec(response.data);

  if (!match) return "";
  return match[1];
}

export async function getCompanyStockInfo(
  ac: Array<CompanyStockInfo>,
): Promise<Array<CompanyStockInfo>> {
  const chunks = [];
  for (let i = 0; i < ac.length; i += 10) {
    chunks.push(ac.slice(i, i + 10));
  }

  return Promise.all(
    chunks.map(async (group) => {
      return Promise.all(
        group.map(async (c) => {
          return {
            ...c,
            businessSector: await getBusinessSector(c),
          };
        }),
      );
    }),
  ).then((results) => results.flat());
}
