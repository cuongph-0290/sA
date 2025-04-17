import React from "react";
import { useRecoilState } from "recoil";
import isEqual from "lodash/isEqual";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "./shared/Modal";
import { getLocalStorageItem, saveLocalStorageItem } from "../utils/store";
import { DEFAULT_GROUP_STOCK } from "../utils/constant";
import { selectedGroupStock } from "../state/control_panel";
import { GroupStocks } from "../types/data";
import allData from "../data/all.json";

const AnalystControlPanel: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [listGroupStocks, setListGroupStocks] = React.useState(
    getLocalStorageItem<GroupStocks[]>("listGroupStocks") || [],
  );
  const [newGroupName, setNewGroupName] = React.useState("");
  const [selectedGroupStockState, setSelectedGroupStockState] =
    useRecoilState(selectedGroupStock);

  const handleAddGroupName = (newGroupName: string) => {
    if (!newGroupName || listGroupStocks.find((g) => g.name === newGroupName)) {
      return;
    }
    setListGroupStocks([
      ...listGroupStocks,
      {
        name: newGroupName,
        stocks: [],
      },
    ]);
  };

  const handleAddStock = (newValue: string) => {
    if (typeof newValue !== "string") {
      return;
    }
    let newListGroupStocks = JSON.parse(JSON.stringify(listGroupStocks));
    newListGroupStocks[selectedIndex].stocks.push(newValue);
    setListGroupStocks(newListGroupStocks);
  };

  const handleDeleteStock = (stock: string) => {
    const newStocks = listGroupStocks[selectedIndex].stocks.filter(
      (s) => s !== stock,
    );
    setListGroupStocks(
      listGroupStocks.map((lgs, i) =>
        i === selectedIndex ? { ...lgs, stocks: newStocks } : lgs,
      ),
    );
  };

  const renderGroupStocks = () => (
    <FormControl
      fullWidth
      sx={{
        height: "40%",
        overflowY: "auto",
        marginBottom: "10px",
      }}
    >
      {listGroupStocks.map((groupStocks, index) => (
        <MenuItem
          sx={{
            backgroundColor: selectedIndex === index ? "#eee" : "white",
            display: "flex",
            justifyContent: "space-between",
            "&:hover .MuiIconButton-root": {
              opacity: 1,
            },
          }}
          key={index}
          value={groupStocks.name}
          onClick={() => setSelectedIndex(index)}
        >
          {groupStocks.name}
          <IconButton
            aria-label="delete"
            onClick={() => {
              setListGroupStocks(
                listGroupStocks.filter((_, i) => i !== selectedIndex),
              );
            }}
            sx={{
              opacity: 0,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MenuItem>
      ))}
    </FormControl>
  );

  const renderStocks = () => (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        maxHeight: "25%",
        overflowY: "auto",
      }}
    >
      {(listGroupStocks[selectedIndex]?.stocks || []).map((stock) => (
        <Box
          sx={{
            display: "flex",
            height: "15px",
            justifyContent: "center",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "5px 10px",
            margin: "0px 5px 5px 5px",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#ddf",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "0.65rem",
            }}
            onClick={() => handleDeleteStock(stock)}
          >
            {stock}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const renderModal = () => (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        List stock settings
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2, height: "60vh" }}>
        <FormControl fullWidth sx={{ pb: "10px" }}>
          <TextField
            value={newGroupName}
            onChange={(e) => {
              setNewGroupName(e.target.value);
            }}
            label="Add group name"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="add"
                  sx={{
                    float: "right",
                    display:
                      newGroupName === DEFAULT_GROUP_STOCK ||
                      !newGroupName ||
                      listGroupStocks.find((g) => g.name === newGroupName)
                        ? "none"
                        : "inline",
                  }}
                  onClick={() => handleAddGroupName(newGroupName)}
                >
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </FormControl>
        {renderGroupStocks()}
        <FormControl fullWidth sx={{ pb: "10px" }}>
          <Autocomplete
            freeSolo
            onChange={(_, newValue) => handleAddStock(newValue)}
            options={Object.keys(allData)}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Add stock" variant="outlined" />
            )}
          />
        </FormControl>
        {renderStocks()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2,
        }}
      >
        <Button
          sx={{
            width: "200px",
          }}
          disabled={isEqual(
            listGroupStocks,
            getLocalStorageItem("listGroupStocks"),
          )}
          variant="contained"
          onClick={() => {
            saveLocalStorageItem("listGroupStocks", listGroupStocks);
            setShowModal(false);
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );

  return (
    <Box sx={{ display: "flex", color: "white" }}>
      <FormControl fullWidth>
        <Select
          value={selectedGroupStockState}
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
          onChange={(e) => setSelectedGroupStockState(e.target.value)}
        >
          <MenuItem key={DEFAULT_GROUP_STOCK} value={DEFAULT_GROUP_STOCK}>
            All
          </MenuItem>
          {listGroupStocks.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton aria-label="settings" onClick={() => setShowModal(true)}>
          <SettingsIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      {renderModal()}
    </Box>
  );
};

export default AnalystControlPanel;
