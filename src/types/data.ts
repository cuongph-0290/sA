export enum StockExchangeName {
  HORSE = "horse",
  HNX = "hnx",
  UPCOM = "upcom",
}

export enum TimePeriodType {
  ONE_WEEK = "1week",
  TWO_WEEKS = "2weeks",
  ONE_MONTH = "1month",
  THREE_MONTHS = "3months",
  SIX_MONTHS = "6months",
  ONE_YEAR = "1year",
}

export type CompanyStockInfo = {
  name: string;
  href: string;
  businessSector?: string;
  businessSectorIds: Array<string>;
};

export type PriceFunctuation = {
  name: string;
  marketCap: string;
  compared: string;
  price: string;
  volume: string;
  priceChange: string;
  volumeCompared: string;
};

export type SEPriceFunctuations = {
  [key in TimePeriodType]: PriceFunctuation[];
};
