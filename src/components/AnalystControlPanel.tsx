import { Box, FormControl, IconButton, MenuItem, Select } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

const AnalystControlPanel: React.FC = () => {
  const [sector, setSector] = React.useState<string>("all");

  return (
    <Box sx={{ display: "flex", color: "white" }}>
      <FormControl fullWidth>
        <Select
          value={sector}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            color: "white",
            "&.MuiSelect-root": {
              svg: {
                color: "white",
              },
            },
          }}
          onChange={(e) => setSector(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton aria-label="settings">
          <SettingsIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AnalystControlPanel;
