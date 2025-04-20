import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ControlPanel from "./components/ControlPanel";
import Home from "./pages/Home";
import Analyst from "./pages/Analyst";
import Compare from "./pages/Compare";
import MenuIcon from "@mui/icons-material/Menu";

export default function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "left" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button component={Link} to="/" variant="text">
              <Typography sx={{ color: "white", mr: 2 }}>Home</Typography>
            </Button>
            <Button component={Link} to="/analyst/" variant="text">
              <Typography sx={{ color: "white" }}>Analyst</Typography>
            </Button>
            <Button component={Link} to="/compare/" variant="text">
              <Typography sx={{ color: "white" }}>Compare</Typography>
            </Button>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
            >
              <ControlPanel />
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyst/" element={<Analyst />} />
          <Route path="/compare/" element={<Compare />} />
        </Routes>
      </Box>
    </Router>
  );
}
