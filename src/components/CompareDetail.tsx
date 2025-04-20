import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";
import allData from "../data/all.json";
import { DATA_HOST } from "../utils/constant";
import TransactionOfCmsis from "./TransactionOfCmsis";

const CompareDetail: React.FC<{ stock: string }> = ({ stock }) => {
  const data = allData[stock];

  return (
    <TableRow sx={{ borderBottom: "1px solid #ddd" }}>
      <TableCell
        sx={{
          width: "300px",
          backgroundColor: "#f5f5f5",
          verticalAlign: "top",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() =>
              window.open(
                `${DATA_HOST}${data["href"]}`,
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            {stock}
          </Typography>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          width: "600px",
          height: "400px",
          textAlign: "left",
        }}
      >
        <iframe
          src={`https://msh-iframe.cafef.vn/chart-for-cafef-web/stockchart?symbol=${stock}`}
          title={stock}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "left" }}>
        <TransactionOfCmsis
          stock={stock}
          configID={5}
          cssFn={(item) => ({
            color: item.text?.includes("bán")
              ? "rgb(220, 0, 0, 0.7)"
              : item.text?.includes("mua")
                ? "rgba(0,128,0,0.8)"
                : "grey",
          })}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "left" }}>
        <TransactionOfCmsis
          stock={stock}
          configID={2}
          cssFn={(item) => ({
            color: item.text?.includes("tiền")
              ? "rgba(0,128,0,0.8)"
              : item.text?.includes("cổ phiếu")
                ? "rgb(220, 0, 0, 0.7)"
                : "grey",
          })}
        />
      </TableCell>
    </TableRow>
  );
};

export default CompareDetail;
