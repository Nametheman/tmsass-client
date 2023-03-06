import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layout/AuthLayout/Login";
import {
  Dashboard,
  Transactions,
  Accounts,
  Services,
  Marketplace,
} from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Dashboard />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/services" element={<Dashboard />} />
          <Route path="/market-place" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
