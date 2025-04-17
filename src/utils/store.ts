import { CACHE_KEY } from "./constant";

export function getLocalStorageItem<P = any>(key: string): P | null {
  try {
    return JSON.parse(localStorage.getItem(`${CACHE_KEY}`))[key] || null;
  } catch (e) {
    return null;
  }
}

export function saveLocalStorageItem(key: string, value: any) {
  const data = JSON.parse(localStorage.getItem(`${CACHE_KEY}`) || "{}");
  data[key] = value;
  localStorage.setItem(`${CACHE_KEY}`, JSON.stringify(data));
}
