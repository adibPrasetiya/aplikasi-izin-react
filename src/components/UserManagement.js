import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Alert, Badge } from "react-bootstrap";
import axios from "axios";

const UserManagement = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    flagActive: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });

  // Fetch users with filters and pagination
  const fetchUsers = async (page = 1) => {
    try {
      // Prepare filter params
      const params = { page };
      if (filters.name) params.name = filters.name;
      if (filters.role) params.role = filters.role;
      if (filters.flagActive) params.flagActive = filters.flagActive;

      const response = await axios.get(
        "http://localhost:3001/api/v1/user/search",
        {
          params,
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      const { data, paging } = response.data;

      setData(data);
      setCurrentPage(paging.page);
      setTotalPages(paging.totalPages);
      setError(null); // Clear any previous error
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage); // Initial fetch
  }, [currentPage]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/user/${selectedUser.username}`,
        {
          name: selectedUser.name,
          role: selectedUser.role,
          flagActive: selectedUser.flagActive,
          currentPassword: selectedUser.password,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setAlert({ type: "success", message: response.data.message });
      setTimeout(() => {
        setShowEditModal(false);
        fetchUsers(currentPage); // Refetch data after update
        setAlert({ type: "", message: "" });
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data.errors || "Error occured during user update";
      setAlert({ type: "danger", message: errorMessage });
    }
  };

  // Handle password reset button click
  const handleUpdatePassword = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/user/${selectedUser.username}`,
        {
          password: passwordForm.newPassword,
          currentPassword: passwordForm.currentPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setAlert({ type: "success", message: response.data.message });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: "", newPassword: "" });
        fetchUsers(currentPage); // Refetch data after update
        setAlert({ type: "", message: "" });
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data.errors || "Error occured during password update";
      setAlert({ type: "danger", message: errorMessage });
    }
  };

  return (
    <div className="p-4">
      <h2>User Management</h2>

      {/* Filter Section */}
      <div className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Filter berdasarkan nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Filter berdasarkan role</Form.Label>
          <Form.Select
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
          >
            <option value="">semua</option>
            <option value="ADMIN">admin</option>
            <option value="MANAJER">manajer</option>
            <option value="USER">user</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Filter berdasarkan status</Form.Label>
          <Form.Select
            value={filters.flagActive}
            onChange={(e) => handleFilterChange("flagActive", e.target.value)}
          >
            <option value="">semua</option>
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={() => fetchUsers(currentPage)}>
          Terapkan Filter
        </Button>
      </div>

      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Departemen</th>
            <th>Password Expired Status</th>
            <th>Password Expired Date</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.username}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "ADMIN" ? (
                  <Badge bg="primary" style={{ minWidth: "4rem" }}>
                    admin
                  </Badge>
                ) : user.role === "MANAJER" ? (
                  <Badge bg="warning" style={{ minWidth: "4rem" }}>
                    manajer
                  </Badge>
                ) : (
                  <Badge bg="dark" style={{ minWidth: "4rem" }}>
                    user
                  </Badge>
                )}
              </td>
              <td>
                {user.flagActive ? (
                  <Badge bg="success" style={{ minWidth: "4rem" }}>
                    aktif
                  </Badge>
                ) : (
                  <Badge bg="danger" style={{ minWidth: "4rem" }}>
                    nonaktif
                  </Badge>
                )}
              </td>
              <td>{user.departement.name}</td>
              <td>
                {new Date(user.passwordExpiredAt) < new Date() ? (
                  <Badge bg="danger" style={{ minWidth: "4rem" }}>
                    expired
                  </Badge>
                ) : (
                  <Badge bg="success" style={{ minWidth: "4rem" }}>
                    aktif
                  </Badge>
                )}
              </td>
              <td>{new Date(user.passwordExpiredAt).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="info"
                  onClick={() => handleResetPassword(user)}
                >
                  Reset Password
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      {selectedUser && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Pengguna</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alert.message && (
              <div className={`alert alert-${alert.type} mt-2`}>
                {alert.message}
              </div>
            )}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev,
                      name: e.target.value, // Perbaikan
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                >
                  <option value="ADMIN">admin</option>
                  <option value="MANAJER">manajer</option>
                  <option value="USER">user</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={selectedUser.flagActive ? "true" : "false"}
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev,
                      flagActive: e.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Aktif</option>
                  <option value="false">Nonaktif</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password Anda</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password anda"
                  onChange={(e) =>
                    setSelectedUser((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Simpan Perubahan
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Password Update Modal */}
      {selectedUser && (
        <Modal
          show={showPasswordModal}
          onHide={() => setShowPasswordModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alert.message && (
              <div className={`alert alert-${alert.type} mt-2`}>
                {alert.message}
              </div>
            )}
            <div className="mb-3">
              <strong>Username:</strong> {selectedUser.username}
            </div>
            <div className="mb-3">
              <strong>Password Expired Status:</strong>{" "}
              {new Date(selectedUser.passwordExpiredAt) < new Date() ? (
                <Badge bg="danger">Expired</Badge>
              ) : (
                <Badge bg="success">Active</Badge>
              )}
            </div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Password Anda</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password Baru User</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdatePassword}
              disabled={
                !passwordForm.currentPassword || !passwordForm.newPassword
              }
            >
              Update Password
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;
