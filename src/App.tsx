import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./pages/home";
import Analyst from "./pages/analyst";
import React from "react";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/analyst/">Analyst</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyst/" element={<Analyst />} />
        </Routes>
      </div>
    </Router>
  );
}
