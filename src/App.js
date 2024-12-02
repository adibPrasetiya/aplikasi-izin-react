import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import LogoutPage from "./components/Logout";
import CutiPage from "./components/Cuti";
import UserManagementPage from "./components/UserManagement";
import LeaveManagementPage from "./components/LeaveManagement";
import HomePage from "./components/Home";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cuti" element={<CutiPage />} />
          <Route path="user-management" element={<UserManagementPage />} />
          {/* <Route path="cuti-management" element={<LeaveManagementPage />} /> */}
        </Route>
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
