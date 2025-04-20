import React, { useEffect } from "react";
import WithControlPanel from "../hoc/WithControlPanel";
import AnalystControlPanel from "../components/AnalystControlPanel";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { GroupStocks } from "../types/data";
import {
  listGroupStocks,
  selectedGroupStockName,
} from "../state/control_panel";
import CompareDetail from "../components/CompareDetail";

const Compare: React.FC = () => {
  const [selectedGStockName] = useRecoilState<string>(selectedGroupStockName);
  const [lGroupStocks, _] = useRecoilState<GroupStocks[]>(listGroupStocks);
  const [selectedGroupStock, setSelectedGroupStock] =
    React.useState<GroupStocks | null>(null);

  useEffect(() => {
    const groupStock = lGroupStocks.find((g) => g.name === selectedGStockName);
    setSelectedGroupStock(groupStock || ({ stocks: [] } as GroupStocks));
  }, [selectedGStockName, lGroupStocks]);

  if (!selectedGroupStock?.stocks?.length) return null;

  return (
    <Box sx={{ marginTop: "4rem" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {selectedGroupStock.stocks.map((stock) => (
              <CompareDetail key={stock} stock={stock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WithControlPanel(Compare, AnalystControlPanel);
