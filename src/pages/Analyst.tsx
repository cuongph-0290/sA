import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import {
  GroupStocks,
  SEPriceFunctuations,
  TimePeriodType,
} from "../types/data";
import {
  listGroupStocks,
  selectedGroupStockName,
} from "../state/control_panel";
import { PRICE_FUNCTUATION_URLS } from "../utils/constant";
import { addInfo, getAllSEPriceFunctuations } from "../utils/scraper";
import { sePriceFunctuations } from "../state/data";
import { useRecoilState } from "recoil";
import AnalystControlPanel from "../components/AnalystControlPanel";
import PriceFunctuations from "../components/PriceFunctions";
import WithControlPanel from "../hoc/WithControlPanel";
import { Snackbar } from "@mui/material";

const Analyst: React.FC = () => {
  const [priceFunctuations, setPriceFunctuations] =
    useRecoilState<SEPriceFunctuations>(sePriceFunctuations);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedGStockName] = useRecoilState<string>(selectedGroupStockName);
  const [lGroupStocks, _] = useRecoilState<GroupStocks[]>(listGroupStocks);

  const selectedGroupStock = lGroupStocks.find(
    (g) => g.name === selectedGStockName,
  ) || { stocks: [] };

  async function fetchData() {
    setIsLoading(true);
    await getAllSEPriceFunctuations(setPriceFunctuations);
    setIsLoading(false);
  }

  useEffect(() => {
    if (isLoading) return;
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
      {Object.keys(PRICE_FUNCTUATION_URLS).map((key) => (
        <PriceFunctuations
          key={key}
          priceFunctuations={addInfo(
            (priceFunctuations[key] || []).filter(
              (p) =>
                !selectedGroupStock.stocks.length ||
                selectedGroupStock.stocks.includes(p.name),
            ) || [],
          )}
          period={key as TimePeriodType}
        />
      ))}

      <Snackbar open={isLoading} message="Loading..." />
    </Box>
  );
};

export default WithControlPanel(Analyst, AnalystControlPanel);

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
