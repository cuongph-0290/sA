import axios from "axios";
import { CompanyStockInfo, PriceFunctuation } from "../types/data";
import {
  DATA_HOST,
  PF_CELL_REGEX,
  PF_CLEANUP_REGEX,
  PF_DATA_REGEX,
  PF_JOIN_CHAR,
  PF_ROW_REGEX,
  PRICE_FUNCTUATION_URLS,
} from "./constant";

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
  updateFunc: Function,
): Promise<void> {
  let sePriceFunctuationsData = {};

  await Promise.all(
    Object.keys(PRICE_FUNCTUATION_URLS).map(async (key) => {
      const pF = await getPriceFunctuation(PRICE_FUNCTUATION_URLS[key]);
      sePriceFunctuationsData = { ...sePriceFunctuationsData, [key]: pF };
      updateFunc(sePriceFunctuationsData);
    }),
  );
}
