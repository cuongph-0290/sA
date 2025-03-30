import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Analyst from "./pages/analyst";
import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

export default function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyst/" element={<Analyst />} />
        </Routes>
      </Box>
    </Router>
  );
}
