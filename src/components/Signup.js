import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert, ProgressBar } from "react-bootstrap";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // Strength score from 0 to 100
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    // Cek apakah form valid dan password cukup kuat
    const formErrors = validateForm();
    const passwordValid = passwordStrength >= 50; // Password dianggap kuat jika skor >= 50 (setara dengan 50% kekuatan)
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

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const lengthCheck = password.length > 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Menilai berdasarkan kriteria
    if (lengthCheck) strength += 20; // panjang password lebih dari 6
    if (hasUppercase) strength += 20; // ada huruf besar
    if (hasLowercase) strength += 20; // ada huruf kecil
    if (hasNumbers) strength += 20; // ada angka
    if (hasSpecialChars) strength += 20; // ada karakter spesial

    return strength; // Skor dari 0 hingga 100
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Nama wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword =
        "Password dan konfirmasi password tidak cocok";
    if (!formData.department) newErrors.department = "Departemen wajib dipilih";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      alert("Formulir berhasil dikirim");
      // Proses pengiriman data ke backend bisa dilakukan di sini.
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
      <Form onSubmit={handleSubmit} className="mt-3">
        {/* Name */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
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

        {/* Department */}
        <Form.Group controlId="formDepartment">
          <Form.Label>Departemen</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            isInvalid={!!errors.department}
          >
            <option value="">Pilih Departemen</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.department}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password Strength Meter */}
        {showPasswordStrength && (
          <div className="mt-3">
            <ProgressBar
              now={passwordStrength}
              label={`${getPasswordStrengthText()}`}
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={!isSubmitEnabled} // Disable button if form is invalid or password is weak
        >
          Daftar
        </Button>
      </Form>

      {Object.keys(errors).length === 0 && (
        <Alert variant="success" className="mt-3">
          Formulir valid dan siap dikirim!
        </Alert>
      )}
    </Container>
  );
};

export default Signup;
