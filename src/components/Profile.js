import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Sami Rahman",
    username: "sami123",
    email: "sami.rahman2002@gmail.com",
    role: "Administrator", // Added role
    department: "IT Department",
    passwordExpiration: "2024-12-01", // Date of password expiration
    isActive: true, // User active status
  });
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(profile.name);
  const [updatedDepartment, setUpdatedDepartment] = useState(
    profile.department
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = () => {
    setProfile({
      ...profile,
      name: updatedName,
      department: updatedDepartment,
    });
    setShowUpdateProfileModal(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setShowChangePasswordModal(false);
  };

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md={4}>
          {/* Profile Card */}
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="user-avatar"
                  className="rounded-circle"
                  width="80"
                />
                <div className="ms-3">
                  <h5>{profile.name}</h5>
                  <p>{profile.role}</p>
                </div>
              </div>
              <Card.Text>
                <strong>Username:</strong> {profile.username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {profile.email}
              </Card.Text>
              <Card.Text>
                <strong>Department:</strong> {profile.department}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowUpdateProfileModal(true)}
                className="w-100 mb-2"
              >
                Update Profile
              </Button>
              <Button
                variant="warning"
                onClick={() => setShowChangePasswordModal(true)}
                className="w-100"
              >
                Update Password
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {/* Status of Password Expiration */}
          <Row>
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>Password Expiration Status</Card.Title>
                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    {profile.passwordExpiration <
                    new Date().toISOString().split("T")[0]
                      ? "Expired"
                      : "Active"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Expiration Date:</strong>{" "}
                    {profile.passwordExpiration}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* User Role and Active Status */}
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>User Role and Active Status</Card.Title>
                  <Card.Text>
                    <strong>Role:</strong> {profile.role}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    {profile.isActive ? "Active" : "Inactive"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal for updating profile */}
      <Modal
        show={showUpdateProfileModal}
        onHide={() => setShowUpdateProfileModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updatedName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="updatedDepartment" className="mt-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={updatedDepartment}
                onChange={(e) => setUpdatedDepartment(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="currentPassword" className="mt-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUpdateProfileModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for updating password */}
      <Modal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="currentPassword" className="mt-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPassword" className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowChangePasswordModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Update Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
