import { atom } from "recoil";

export const controlPanel = atom({
  key: "controlPanel",
  default: null,
});

export const selectedGroupStock = atom({
  key: "selectedGroupStock",
  default: "all",
});
