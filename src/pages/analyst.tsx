import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { JSX, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sePriceFunctuations } from "../state/data";
import { SEPriceFunctuations } from "../types/data";
import { getAllSEPriceFunctuations } from "../utils/scraper";

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
    // fetchData();
  }, []);

  console.log(isLoading, priceFunctuations);

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {companyData[StockExchangeName.HORSE].map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.href}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
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
