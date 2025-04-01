import { atom } from "recoil";
import {
  CompanyStockInfo,
  StockExchangeName,
  SEPriceFunctuations,
  TimePeriodType,
} from "../types/data";
import horseData from "../data/horse.json";
import hnxData from "../data/hnx.json";
import upcomData from "../data/upcom.json";

export const companies = atom<{
  [key in StockExchangeName]: Array<CompanyStockInfo>;
}>({
  key: "companies",
  default: {
    [StockExchangeName.HORSE]: horseData as CompanyStockInfo[],
    [StockExchangeName.HNX]: hnxData as CompanyStockInfo[],
    [StockExchangeName.UPCOM]: upcomData as CompanyStockInfo[],
  },
});

export const sePriceFunctuations = atom<SEPriceFunctuations>({
  key: "sePriceFunctuations",
  default: {
    [TimePeriodType.ONE_WEEK]: [],
    [TimePeriodType.TWO_WEEKS]: [],
    [TimePeriodType.ONE_MONTH]: [],
    [TimePeriodType.THREE_MONTHS]: [],
    [TimePeriodType.SIX_MONTHS]: [],
    [TimePeriodType.ONE_YEAR]: [],
  },
});
