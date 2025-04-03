import { Box, Typography } from "@mui/material";
import React from "react";
import businessSectorData from "../data/businessSector.json";

const BusinessSectorAnalystics: React.FC<{
  bSA: Array<string>;
  bsFilter: Array<string>;
  setBFilter: Function;
}> = ({ bSA, bsFilter, setBFilter }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100px",
      }}
    >
      {bSA.slice(0, 10).map((bs) => (
        <BusinessSectorDetail
          bsFilter={bsFilter}
          setBFilter={setBFilter}
          key={bs}
          bs={bs}
        />
      ))}
    </Box>
  );
};

const BusinessSectorDetail: React.FC<{
  bs: string;
  bsFilter: Array<string>;
  setBFilter: Function;
}> = ({ bs, bsFilter, setBFilter }) => {
  const [id, count] = bs.split(":");

  return (
    <Box
      sx={{
        display: "flex",
        height: "15px",
        justifyContent: "center",
        border: "1px solid #ccc",
        backgroundColor: bsFilter.includes(id) ? "#ddf" : "#eee",
        borderRadius: "15px",
        padding: "5px 10px",
        margin: "0px 5px",
      }}
    >
      <Typography
        sx={{ fontSize: "0.65rem", cursor: "pointer" }}
        onClick={() =>
          setBFilter(
            bsFilter.includes(id)
              ? bsFilter.filter((f) => f !== id)
              : [...bsFilter, id],
          )
        }
      >
        {businessSectorData[id]} {count}
      </Typography>
    </Box>
  );
};

export default BusinessSectorAnalystics;
