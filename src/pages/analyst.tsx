import React, { JSX, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sePriceFunctuations } from "../state/data";
import { SEPriceFunctuations, TimePeriodType } from "../types/data";
import { addInfo, getAllSEPriceFunctuations } from "../utils/scraper";
import PriceFunctuations from "../components/PriceFunctions";
import { Box } from "@mui/material";
import { PRICE_FUNCTUATION_URLS } from "../utils/constant";

export default function Analyst(): JSX.Element {
  const [priceFunctuations, setPriceFunctuations] =
    useRecoilState<SEPriceFunctuations>(sePriceFunctuations);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function fetchData() {
    setIsLoading(true);
    await getAllSEPriceFunctuations(setPriceFunctuations);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(isLoading, priceFunctuations);

  return (
    <Box
      sx={{
        marginTop: "4rem",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: "1rem",
        width: "200vw",
      }}
    >
      {Object.keys(PRICE_FUNCTUATION_URLS).map((key, index) => (
        <PriceFunctuations
          key={key}
          priceFunctuations={addInfo(priceFunctuations[key] || [])}
          period={key as TimePeriodType}
        />
      ))}
    </Box>
  );
}

// import businessSectorData from "../data/businessSector.json";
// import { getCompanyStockInfo } from "../utils/scraper";

// async function getData(companyData: any) {
//   console.log(
//     StockExchangeName.HORSE,
//     await getCompanyStockInfo(companyData[StockExchangeName.HNX]),
//   );
// }

// TODO: move to admin
// [StockExchangeName.HORSE, StockExchangeName.HNX, StockExchangeName.UPCOM].forEach((key) => {
//   console.log(key)
//   const r = companyData[key].map((c) => {
//     const bs = c.businessSector.split(" / ");
//     const bdIds = bs.map((b) => Object.entries(businessSectorData).find(([id, bd]) => bd === b)?.[0]);

//     return {
//       name: c.name,
//       href: c.href,
//       businessSectorIds: bdIds,
//     }
//   })
//   console.log(r)
// });

// const sectors = [StockExchangeName.HORSE, StockExchangeName.HNX, StockExchangeName.UPCOM].map((key) => companyData[key]
//   .map((c) => c.businessSector.split(" / "))
//   .flat())
//   .flat()
//   .filter((value, index, self) => self.indexOf(value) === index);
// const sectorObject = sectors.reduce((obj, sector, index) => {
//   obj[index+1] = sector;
//   return obj;
// }, {} as Record<number, string>);
// console.log(sectorObject);

// useEffect(() => {
//   getData(companyData);
// }, [companyData]);
