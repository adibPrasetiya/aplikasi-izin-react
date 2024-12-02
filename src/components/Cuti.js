import React, { useState } from "react";
import { Table, Pagination, Button, Modal, Form, Badge } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid"; // Untuk membuat UUID v4

const CutiPage = () => {
  // Data cuti
  const [leaves, setLeaves] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: uuidv4(),
      status:
        index % 4 === 0
          ? "draft"
          : index % 4 === 1
          ? "terkirim"
          : index % 4 === 2
          ? "diterima"
          : "ditolak",
      date: `10 Januari 2024 + ${index}`,
      reason: `Alasan permohonan cuti ${index + 1}`,
      verifier: index % 4 === 1 ? "John Doe" : "",
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [newLeaveDate, setNewLeaveDate] = useState("");
  const [newLeaveReason, setNewLeaveReason] = useState("");

  // Fungsi untuk membuka modal buat permohonan cuti
  const handleCreateLeave = () => {
    setShowCreateModal(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewLeaveDate("");
    setNewLeaveReason("");
  };

  // Fungsi untuk menyimpan permohonan cuti baru
  const handleSaveNewLeave = () => {
    const newLeave = {
      id: uuidv4(),
      status: "draft",
      date: newLeaveDate,
      reason: newLeaveReason,
      verifier: "",
    };
    setLeaves([...leaves, newLeave]);
    handleCloseCreateModal();
  };

  // Fungsi untuk membuka modal edit cuti
  const handleEditLeave = (leave) => {
    setSelectedLeave(leave);
    setShowEditModal(true);
  };

  // Fungsi untuk menyimpan perubahan edit cuti
  const handleSaveEditLeave = () => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === selectedLeave.id ? selectedLeave : leave
    );
    setLeaves(updatedLeaves);
    setShowEditModal(false);
    setSelectedLeave(null);
  };

  // Fungsi untuk menghapus permohonan cuti
  const handleDeleteLeave = () => {
    setLeaves(leaves.filter((leave) => leave.id !== selectedLeave.id));
    setShowEditModal(false);
    setSelectedLeave(null);
  };

  // Fungsi untuk mengirim permohonan cuti
  const handleSendLeave = () => {
    setSelectedLeave({
      ...selectedLeave,
      status: "terkirim",
    });
    handleSaveEditLeave();
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeaves = leaves.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(leaves.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2>Daftar Permohonan Cuti</h2>

      {/* Tombol buat permohonan cuti baru */}
      <Button variant="primary" onClick={handleCreateLeave} className="mb-3">
        Buat Permohonan Cuti Baru
      </Button>

      {/* Tabel permohonan cuti */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Cuti</th>
            <th>Status</th>
            <th>Tanggal Cuti</th>
            <th>Alasan</th>
            <th>Aksi</th>
            <th>Verifikator</th>
          </tr>
        </thead>
        <tbody>
          {currentLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>
                {leave.status === "draft" && <Badge bg="warning">Draft</Badge>}
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
              <td>{leave.reason}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleSendLeave(leave)}
                  className="me-2"
                  disabled={leave.status !== "draft"}
                >
                  Kirim
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditLeave(leave)}
                  className="me-2"
                  disabled={
                    leave.status === "terkirim" ||
                    leave.status === "diterima" ||
                    leave.status === "ditolak"
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteLeave(leave)}
                  disabled={
                    leave.status === "terkirim" ||
                    leave.status === "diterima" ||
                    leave.status === "ditolak"
                  }
                >
                  Hapus
                </Button>
              </td>
              <td>{leave.verifier || "Belum Diverifikasi"}</td>
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

      {/* Modal untuk membuat permohonan cuti baru */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buat Permohonan Cuti Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Cuti</Form.Label>
              <Form.Control
                type="date"
                value={newLeaveDate}
                onChange={(e) => setNewLeaveDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alasan Cuti</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={100}
                value={newLeaveReason}
                onChange={(e) => setNewLeaveReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveNewLeave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk edit permohonan cuti */}
      {selectedLeave && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Permohonan Cuti</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Cuti</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedLeave.date}
                  onChange={(e) =>
                    setSelectedLeave({ ...selectedLeave, date: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alasan Cuti</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedLeave.reason}
                  onChange={(e) =>
                    setSelectedLeave({
                      ...selectedLeave,
                      reason: e.target.value,
                    })
                  }
                  maxLength={100}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDeleteLeave}>
              Hapus
            </Button>
            <Button variant="primary" onClick={handleSaveEditLeave}>
              Simpan Perubahan
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CutiPage;
