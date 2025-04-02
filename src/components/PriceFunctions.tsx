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
import { PriceFunctuation, TimePeriodType } from "../types/data";
import React from "react";

const PriceFunctuations: React.FC<{
  priceFunctuations: PriceFunctuation[];
  period: TimePeriodType;
}> = ({ priceFunctuations, period }) => {
  return (
    <Box sx={{ mt: 2, width: "33vw" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="div">
          {period}
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">market cap</TableCell>
              <TableCell align="right">compared</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">volume</TableCell>
              <TableCell align="right">price change</TableCell>
              <TableCell align="right">volume compared</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceFunctuations.map((row, index) => (
              <TableRow
                key={`${period}${row.name}${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
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
