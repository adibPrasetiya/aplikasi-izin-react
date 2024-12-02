import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { getDecodedToken } from "../utils/decodeToken";

const Dashboard = () => {
  const decodedToken = getDecodedToken();
  const userRole = decodedToken?.role || "USER"; // Default role as "USER"

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <div className="d-flex flex-grow-1">
        <div
          className="sidebar bg-dark text-white p-3"
          style={{ width: "250px" }}
        >
          <h3 className="mb-4">Dashboard</h3>
          <Nav className="flex-column">
            <NavItem>
              <NavLink as={Link} to="/dashboard/profile" className="text-white">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink as={Link} to="/dashboard/cuti" className="text-white">
                Cuti
              </NavLink>
            </NavItem>
            {userRole === "ADMIN" && (
              <NavItem>
                <NavLink
                  as={Link}
                  to="/dashboard/user-management"
                  className="text-white"
                >
                  User Management
                </NavLink>
              </NavItem>
            )}
            {userRole === "MANAGER" && (
              <NavItem>
                <NavLink
                  as={Link}
                  to="/dashboard/leave-management"
                  className="text-white"
                >
                  Leave Management
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink as={Link} to="/logout" className="text-white">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 flex-grow-1">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <small>
          &copy; 2024 Direktorat Keamanan Siber dan Sandi Pemerintah Pusat BSSN
        </small>
      </footer>
    </div>
  );
};

export default Dashboard;
