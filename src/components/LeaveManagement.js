import React, { useState } from "react";
import { Table, Pagination, Button, Form, Badge } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid"; // Untuk membuat UUID v4

const LeaveManagementPage = () => {
  // Data permohonan cuti
  const [leaves, setLeaves] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: uuidv4(),
      name: `User ${index + 1}`,
      username: `user${index + 1}`,
      department: index % 2 === 0 ? "IT" : "HR",
      email: `user${index + 1}@example.com`,
      status:
        index % 4 === 0
          ? "draft"
          : index % 4 === 1
          ? "terkirim"
          : index % 4 === 2
          ? "diterima"
          : "ditolak",
      date: `10 Januari 2024 + ${index}`,
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filterName, setFilterName] = useState("");
  const [filterUsername, setFilterUsername] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fungsi untuk memfilter data berdasarkan input
  const filteredLeaves = leaves.filter((leave) => {
    const nameMatch = leave.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const usernameMatch = leave.username
      .toLowerCase()
      .includes(filterUsername.toLowerCase());
    const departmentMatch = leave.department
      .toLowerCase()
      .includes(filterDepartment.toLowerCase());
    const statusMatch =
      leave.status.toLowerCase().includes(filterStatus.toLowerCase()) ||
      filterStatus === "";

    return nameMatch && usernameMatch && departmentMatch && statusMatch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);

  // Fungsi untuk menerima permohonan cuti
  const handleAcceptLeave = (id) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status: "diterima" } : leave
      )
    );
  };

  // Fungsi untuk menolak permohonan cuti
  const handleRejectLeave = (id) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status: "ditolak" } : leave
      )
    );
  };

  return (
    <div className="p-4">
      <h2>Manajemen Cuti</h2>

      {/* Filter Form */}
      <Form className="mb-3">
        <Form.Row>
          <Form.Group className="col-md-3" controlId="filterName">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter Nama"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-3" controlId="filterUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter Username"
              value={filterUsername}
              onChange={(e) => setFilterUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-3" controlId="filterDepartment">
            <Form.Label>Departemen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter Departemen"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-3" controlId="filterStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="terkirim">Terkirim</option>
              <option value="diterima">Diterima</option>
              <option value="ditolak">Ditolak</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>

      {/* Tabel Permohonan Cuti */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Username</th>
            <th>Departemen</th>
            <th>Email</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.name}</td>
              <td>{leave.username}</td>
              <td>{leave.department}</td>
              <td>{leave.email}</td>
              <td>
                {leave.status === "terkirim" && (
                  <Badge bg="primary">Terkirim</Badge>
                )}
                {leave.status === "diterima" && (
                  <Badge bg="success">Diterima</Badge>
                )}
                {leave.status === "ditolak" && (
                  <Badge bg="danger">Ditolak</Badge>
                )}
              </td>
              <td>{leave.date}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAcceptLeave(leave.id)}
                  className="me-2"
                  disabled={leave.status !== "terkirim"}
                >
                  Terima
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRejectLeave(leave.id)}
                  disabled={leave.status !== "terkirim"}
                >
                  Tolak
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
    </div>
  );
};

export default LeaveManagementPage;
