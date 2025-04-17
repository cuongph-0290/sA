import { atom } from "recoil";
import { getLocalStorageItem } from "../utils/store";
import { GroupStocks } from "../types/data";

export const controlPanel = atom({
  key: "controlPanel",
  default: null,
});

export const listGroupStocks = atom({
  key: "listGroupStocks",
  default: getLocalStorageItem<GroupStocks[]>("listGroupStocks") || [],
});

export const selectedGroupStockName = atom({
  key: "selectedGroupStockName",
  default: "all",
});
