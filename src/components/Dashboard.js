import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/* Sidebar */}
      <div className="d-flex">
        <div
          className="sidebar bg-dark text-white p-3"
          style={{ width: "250px", height: "100vh" }}
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
            <NavItem>
              <NavLink
                as={Link}
                to="/dashboard/leave-management"
                className="text-white"
              >
                Cuti Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                as={Link}
                to="/dashboard/user-management"
                className="text-white"
              >
                User Management
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink as={Link} to="/logout" className="text-white">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
