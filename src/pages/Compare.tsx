import React, { useEffect } from "react";
import WithControlPanel from "../hoc/WithControlPanel";
import AnalystControlPanel from "../components/AnalystControlPanel";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { GroupStocks } from "../types/data";
import {
  listGroupStocks,
  selectedGroupStockId,
} from "../state/control_panel";
import CompareDetail from "../components/CompareDetail";

const Compare: React.FC = () => {
  const [selectedGStockId] = useRecoilState<string>(selectedGroupStockId);
  const [lGroupStocks, _] = useRecoilState<GroupStocks[]>(listGroupStocks);
  const [selectedGroupStock, setSelectedGroupStock] =
    React.useState<GroupStocks | null>(null);

  useEffect(() => {
    const groupStock = lGroupStocks.find((g) => g.id === selectedGStockId);
    setSelectedGroupStock(groupStock || ({ stocks: [] } as GroupStocks));
  }, [selectedGStockId, lGroupStocks]);

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
