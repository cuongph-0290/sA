import { Box, Typography } from "@mui/material";
import React from "react";
import businessSectorData from "../data/businessSector.json";

const BusinessSectorAnalystics: React.FC<{ bSA: Array<string> }> = ({
  bSA,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100px",
      }}
    >
      {bSA.slice(0, 10).map((bs) => (
        <BusinessSectorDetail key={bs} bs={bs} />
      ))}
    </Box>
  );
};

const BusinessSectorDetail: React.FC<{ bs: string }> = ({ bs }) => {
  const [id, count] = bs.split(":");

  return (
    <Box
      sx={{
        display: "flex",
        height: "15px",
        justifyContent: "center",
        border: "1px solid #ccc",
        backgroundColor: "#eee",
        borderRadius: "15px",
        padding: "5px 10px",
        margin: "0px 5px",
      }}
    >
      <Typography sx={{ fontSize: "0.65rem" }}>
        {businessSectorData[id]} {count}
      </Typography>
    </Box>
  );
};

export default BusinessSectorAnalystics;
