import { atom } from "recoil";
import { CompanyStockInfo, StockExchangeName } from "../types/data";
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
