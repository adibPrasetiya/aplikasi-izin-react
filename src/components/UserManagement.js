import React, { useState } from "react";
import { Table, Pagination, Button, Modal, Form, Badge } from "react-bootstrap";

const UserManagementPage = () => {
  // Contoh data pengguna
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      isActive: true,
      isPasswordExpired: false,
      department: "IT",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "janesmith@example.com",
      isActive: false,
      isPasswordExpired: true,
      department: "HR",
      role: "User",
    },
    // Tambahkan lebih banyak data di sini...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fungsi untuk membuka modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Fungsi untuk menyimpan perubahan pada user
  const handleSaveChanges = () => {
    // Logika penyimpanan perubahan dapat ditambahkan di sini
    console.log("User updated:", selectedUser);
    setShowModal(false);
  };

  // Data untuk pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2>Manajemen Pengguna</h2>

      {/* Tabel pengguna */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Password Expired</th>
            <th>Departemen</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.isActive ? (
                  <Badge bg="success">Aktif</Badge>
                ) : (
                  <Badge bg="danger">Nonaktif</Badge>
                )}
              </td>
              <td>
                {user.isPasswordExpired ? (
                  <Badge bg="warning">Sudah</Badge>
                ) : (
                  <Badge bg="primary">Belum</Badge>
                )}
              </td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={currentPage === pageNumber + 1}
            onClick={() => setCurrentPage(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal untuk edit user */}
      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Pengguna</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Check
                  type="switch"
                  label="Aktif"
                  checked={selectedUser.isActive}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      isActive: e.target.checked,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password Expired</Form.Label>
                <Form.Check
                  type="switch"
                  label="Expired"
                  checked={selectedUser.isPasswordExpired}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      isPasswordExpired: e.target.checked,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Departemen</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.department}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      department: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserManagementPage;
