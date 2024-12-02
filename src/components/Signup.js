import React, { useState, useEffect } from "react";
import { Form, Button, Container, ProgressBar, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  // Load daftar semua departemen di awal halaman
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/departement/search"
        );
        setDepartmentOptions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching department data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Validasi form dan kekuatan password
  useEffect(() => {
    const formErrors = validateForm();
    const passwordValid = passwordStrength >= 50;
    setIsSubmitEnabled(Object.keys(formErrors).length === 0 && passwordValid);
  }, [formData, passwordStrength]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
      setShowPasswordStrength(true);
    }
  };

  const handleDepartmentSelect = (e) => {
    const selectedDepartment = departmentOptions.find(
      (dept) => dept.departementId === e.target.value
    );
    setFormData({
      ...formData,
      department: selectedDepartment ? selectedDepartment.departementId : "",
    });
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const lengthCheck = password.length > 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCheck) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasNumbers) strength += 20;
    if (hasSpecialChars) strength += 20;

    return strength;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Nama wajib diisi";
    if (!formData.username) newErrors.username = "Nama wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword =
        "Password dan konfirmasi password tidak cocok";
    if (!formData.department) newErrors.department = "Departemen wajib dipilih";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const reqBody = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        departementId: formData.department,
      };
      console.log(reqBody);
      try {
        const response = await axios.post(
          "http://localhost:3001/api/v1/user",
          reqBody
        );
        setAlert({
          type: "success",
          message: "Berhasil mendaftarkan pengguna baru",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error.response?.data || "Terjadi kesalahan saat mengirim data.";
        setAlert({ type: "danger", message: errorMessage });
      }
    }
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 80) return "Sangat Kuat";
    if (passwordStrength >= 60) return "Kuat";
    if (passwordStrength >= 40) return "Sedang";
    if (passwordStrength >= 20) return "Lemah";
    return "Sangat Lemah";
  };

  return (
    <Container>
      <h2 className="mt-4">Registrasi Pengguna</h2>
      {alert.message && (
        <Alert variant={alert.type} className="mt-3">
          {Array.isArray(alert.message)
            ? alert.message.join(", ")
            : typeof alert.message === "object"
            ? JSON.stringify(alert.message)
            : alert.message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="formName">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan usernama"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Konfirmasi Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan konfirmasi password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Departemen</Form.Label>
          {isLoading ? (
            <div>Memuat...</div>
          ) : (
            <Form.Control
              as="select"
              value={formData.department}
              onChange={handleDepartmentSelect}
              isInvalid={!!errors.department}
            >
              <option value="">Pilih departemen</option>
              {departmentOptions.map((dept) => (
                <option key={dept.departementId} value={dept.departementId}>
                  {dept.name}
                </option>
              ))}
            </Form.Control>
          )}
          <Form.Control.Feedback type="invalid">
            {errors.department}
          </Form.Control.Feedback>
        </Form.Group>

        {showPasswordStrength && (
          <div className="mt-3">
            <ProgressBar
              now={passwordStrength}
              label={`${getPasswordStrengthText()}`}
            />
          </div>
        )}

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={!isSubmitEnabled}
        >
          Daftar
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
