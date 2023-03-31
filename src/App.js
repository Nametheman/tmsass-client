import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layout/AuthLayout/Login";
import {
  Dashboard,
  Transactions,
  Accounts,
  Services,
  Marketplace,
  History,
  Profile,
  BulkServices,
} from "./pages";
import ProtectedRoute from "./hooks/ProtectedRoute";
import InActivityTimeOut from "./hooks/InactivityTimeout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<InActivityTimeOut />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/account" element={<Accounts />} />
              <Route path="/account/deposit-history" element={<History />} />
              <Route path="/services" element={<Services />} />
              <Route path="/bulk-services" element={<BulkServices />} />
              <Route path="/dashboard/profile-settings" element={<Profile />} />
              {/* <Route path="/account:trxref"/> */}
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
