import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { getDecodedToken } from "../utils/decodeToken";
import { formatDateToIndonesian } from "../utils/formatDateToIndonesia";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const decodedToken = getDecodedToken();
    if (decodedToken) {
      setProfile({
        name: decodedToken.name,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role,
        department: decodedToken.departementName,
        passwordExpiration: decodedToken.passwordExpiredAt,
        isActive: decodedToken.flagActive,
      });
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3001/api/v1/user/current",
        {
          name: updatedName,
          currentPassword: currentPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setAlert({ type: "success", message: response.data.data });
      localStorage.removeItem("authToken");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data.errors || "Error occured during profile update";
      setAlert({ type: "danger", message: errorMessage });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.patch(
        "http://localhost:3001/api/v1/user/current",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      setAlert({ type: "success", message: response.data.data });

      localStorage.removeItem("authToken");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data.errors || "Error occured during password update";
      setAlert({ type: "danger", message: errorMessage });
    }
  };

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md={4}>
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
                    {profile.passwordExpiration
                      ? formatDateToIndonesian(profile.passwordExpiration)
                      : "Not Available"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
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

      {/* Update Profile Modal */}
      <Modal
        show={showUpdateProfileModal}
        onHide={() => setShowUpdateProfileModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.message && (
            <div className={`alert alert-${alert.type} mt-2`}>
              {alert.message}
            </div>
          )}
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

      {/* Change Password Modal */}
      <Modal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
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
