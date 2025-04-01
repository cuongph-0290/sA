export enum StockExchangeName {
  HORSE = "horse",
  HNX = "hnx",
  UPCOM = "upcom",
}
export interface CompanyStockInfo {
  name: string;
  href: string;
  businessSector?: string;
  businessSectorIds: Array<string>;
}

export interface PriceFunctuation {
  name: string;
  marketCap: string;
  compared: string;
  price: string;
  volume: string;
  priceChange: string;
  volumeCompared: string;
}
