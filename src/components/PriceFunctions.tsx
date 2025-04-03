import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  PriceFunctuation,
  StockExchangeName,
  TimePeriodType,
} from "../types/data";
import React from "react";
import { buildBSAnalystics } from "../utils/scraper";
import BusinessSectorAnalystics from "./BusinessSectorAnalystics";

const PriceFunctuations: React.FC<{
  priceFunctuations: PriceFunctuation[];
  period: TimePeriodType;
}> = ({ priceFunctuations, period }) => {
  const [bsFilter, setBSFilter] = React.useState<string[]>([]);

  const fontSize = "0.85rem";

  return (
    <Box sx={{ mt: 2, width: "33vw" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="div">
          {period}
        </Typography>
      </Box>
      <BusinessSectorAnalystics
        bSA={buildBSAnalystics(priceFunctuations)}
        bsFilter={bsFilter}
        setBFilter={setBSFilter}
      />

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize }}>{`Name`}</TableCell>
              <TableCell
                align="right"
                sx={{ fontSize }}
              >{`market cap`}</TableCell>
              <TableCell
                align="right"
                sx={{ fontSize }}
              >{`compared`}</TableCell>
              <TableCell align="right" sx={{ fontSize }}>{`price`}</TableCell>
              <TableCell align="right" sx={{ fontSize }}>{`volume`}</TableCell>
              <TableCell
                align="right"
                sx={{ fontSize }}
              >{`price change`}</TableCell>
              <TableCell
                align="right"
                sx={{ fontSize }}
              >{`volume compared`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceFunctuations
              .filter(
                (p) =>
                  !bsFilter.length ||
                  (p["businessSectorIds"] || []).some((id) =>
                    bsFilter.includes(id),
                  ),
              )
              .map((row, index) => (
                <TableRow
                  key={`${period}${row.name}${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight:
                        row["stockExchange"] === StockExchangeName.HORSE
                          ? "bold"
                          : "normal",
                      fontStyle:
                        row["stockExchange"] === StockExchangeName.UPCOM
                          ? "italic"
                          : "normal",
                      textDecoration:
                        row["stockExchange"] === StockExchangeName.UPCOM
                          ? "underline"
                          : "none",
                    }}
                  >
                    {row.name}
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        width: "400px",
                        position: "absolute",
                        fontWeight: "normal",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontSize: "0.65rem",
                      }}
                    >
                      {row["businessSector"]}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{row.marketCap}</TableCell>
                  <TableCell align="right">{row.compared}%</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.volume}</TableCell>
                  <TableCell align="right">{row.priceChange}%</TableCell>
                  <TableCell align="right">{row.volumeCompared}%</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PriceFunctuations;
