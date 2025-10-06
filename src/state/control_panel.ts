import { atom } from "recoil";
import { getLocalStorageItem } from "../utils/store";
import { GroupStocks } from "../types/data";
import { generateGroupIdForGroupStock } from "../utils/helper";

export const controlPanel = atom({
  key: "controlPanel",
  default: null,
});

export const listGroupStocks = atom({
  key: "listGroupStocks",
  default: generateGroupIdForGroupStock(getLocalStorageItem<GroupStocks[]>("listGroupStocks") || []),
});

export const selectedGroupStockId = atom({
  key: "selectedGroupStockId",
  default: "all",
});
