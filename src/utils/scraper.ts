import axios from "axios";
import {
  CompanyStockInfo,
  PriceFunctuation,
  SEPriceFunctuations,
} from "../types/data";
import {
  CACHE_KEY,
  DATA_HOST,
  PF_CELL_REGEX,
  PF_CLEANUP_REGEX,
  PF_DATA_REGEX,
  PF_JOIN_CHAR,
  PF_ROW_REGEX,
  PRICE_FUNCTUATION_URLS,
} from "./constant";
import allData from "../data/all.json";
import businessSectorData from "../data/businessSector.json";

// TODO: move to admin
export async function getBusinessSector(c: CompanyStockInfo): Promise<string> {
  const response = await axios.get(`${DATA_HOST}${c.href}`);
  const regex = /<span class="subtitle" style="color:Red;">(.*?)<\/span>/g;
  const match = regex.exec(response.data);

  if (!match) return "";
  return match[1];
}

// TODO: move to admin
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

export async function getPriceFunctuation(
  url: string,
): Promise<Array<PriceFunctuation>> {
  const response = await axios.get(url);
  const rawData: string[] = [];

  let rowMatch;
  while ((rowMatch = PF_ROW_REGEX.exec(response.data)) !== null) {
    rawData.push(rowMatch[0]);
  }

  return rawData.map((row) => {
    const data: string[] = [];
    let cellMatch;

    while ((cellMatch = PF_CELL_REGEX.exec(row)) !== null) {
      let cellData = [];
      let dataMatch;

      while ((dataMatch = PF_DATA_REGEX.exec(cellMatch[0])) !== null) {
        cellData.push(dataMatch[1].replace(PF_CLEANUP_REGEX, ""));
      }

      data.push(cellData.join(PF_JOIN_CHAR));
    }

    return {
      name: data[0].split(PF_JOIN_CHAR)[1],
      marketCap: data[1],
      compared: data[4].split(PF_JOIN_CHAR)[1],
      price: data[2].split(PF_JOIN_CHAR)[0],
      volume: data[3],
      priceChange: data[2].split(PF_JOIN_CHAR)[1],
      volumeCompared: data[6].split(PF_JOIN_CHAR)[1],
    };
  });
}
export async function getAllSEPriceFunctuations(
  updateFunc: (sePriceFunctuations: SEPriceFunctuations) => void,
): Promise<void> {
  let sePriceFunctuations = {};
  let needUpdate = false;

  await Promise.all(
    Object.entries(PRICE_FUNCTUATION_URLS).map(async ([key, url]) => {
      let priceFunctuations = getPriceFunctuationFromCache(key);

      if (!priceFunctuations.length) {
        try {
          priceFunctuations = await getPriceFunctuation(url);
          needUpdate = true;
        } catch (e) {
          console.error(e);
        }
      }

      sePriceFunctuations = {
        ...sePriceFunctuations,
        [key]: priceFunctuations,
      };
      updateFunc(sePriceFunctuations as SEPriceFunctuations);
    }),
  );

  if (needUpdate)
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        priceFunctuations: sePriceFunctuations,
        updatedTime: new Date(),
      }),
    );
}

function getPriceFunctuationFromCache(key: string): Array<PriceFunctuation> {
  try {
    const stored = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    const { updatedTime, priceFunctuations } = stored;

    if (!updatedTime || !priceFunctuations) {
      return [];
    }

    const updatedDate = new Date(updatedTime);
    const currentDate = new Date();

    if (
      updatedDate.getFullYear() !== currentDate.getFullYear() ||
      updatedDate.getMonth() !== currentDate.getMonth() ||
      updatedDate.getDate() !== currentDate.getDate() ||
      (updatedDate.getHours() < 15 && currentDate.getHours() >= 15)
    ) {
      return [];
    }

    return priceFunctuations[key] || [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export function addInfo(
  priceFunctuations: Array<PriceFunctuation>,
): Array<PriceFunctuation> {
  return priceFunctuations.map((p) => {
    return {
      ...p,
      businessSector: (allData[p.name]?.businessSectorIds || [])
        .map((id) => businessSectorData[id])
        .join(" / "),
      businessSectorIds: allData[p.name]?.businessSectorIds,
      stockExchange: allData[p.name]?.stockExchange,
    };
  });
}

export function buildBSAnalystics(
  priceFunctuations: Array<PriceFunctuation>,
): Array<string> {
  const result: Record<string, number> = {};

  priceFunctuations.slice(0, 100).forEach((p) => {
    (p["businessSectorIds"] || []).forEach((id) => {
      const compared = parseFloat(p.compared);

      if (isNaN(compared) || compared < 1) return;

      result[id] = (result[id] || 0) + 1;
    });
  });

  const sortedResult = Object.entries(result).sort(
    ([, countA], [, countB]) => countB - countA,
  );

  return sortedResult.map(([id, count]) => `${id}:${count}`);
}
