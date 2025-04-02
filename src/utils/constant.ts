import { TimePeriodType } from "../types/data";

export const CACHE_KEY = "sA";

// URL
export const DATA_HOST = `https://cafef.vn`;
export const PRICE_FUNCTUATION_URLS = {
  [TimePeriodType.ONE_WEEK]: `${DATA_HOST}/du-lieu/thong-ke/san-all.chn`,
  [TimePeriodType.TWO_WEEKS]: `${DATA_HOST}/du-lieu/thong-ke/timeline-2-tuan/san-all.chn`,
  [TimePeriodType.ONE_MONTH]: `${DATA_HOST}/du-lieu/thong-ke/timeline-1-thang/san-all.chn`,
  [TimePeriodType.THREE_MONTHS]: `${DATA_HOST}/du-lieu/thong-ke/timeline-3-thang/san-all.chn`,
  [TimePeriodType.SIX_MONTHS]: `${DATA_HOST}/du-lieu/thong-ke/timeline-6-thang/san-all.chn`,
  [TimePeriodType.ONE_YEAR]: `${DATA_HOST}/du-lieu/thong-ke/timeline-1-nam/san-all.chn`,
};

// Regex
export const PF_ROW_REGEX = /<tr class="rowItem">([\s\S]+?)<\/tr>/g;
export const PF_CELL_REGEX = /<td.*?>(.*?)<\/td>/gs;
export const PF_DATA_REGEX = />(.*?)</gs;
export const PF_CLEANUP_REGEX = /[%)\s/>\r\n]/g;
export const PF_JOIN_CHAR = "_";
