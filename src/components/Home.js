import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Selamat Datang di Aplikasi Izin
              </Card.Title>
              <Card.Text className="text-center mb-4">
                Aplikasi ini memungkinkan Anda untuk mengajukan, memantau, dan
                mengelola permohonan cuti. Gunakan fitur-fitur berikut untuk
                memudahkan pengelolaan izin Anda.
              </Card.Text>
              <Row className="justify-content-center">
                <Col md={6}>
                  <Link to="/dashboard/cuti">
                    <Button variant="primary" block>
                      Ajukan Permohonan Cuti
                    </Button>
                  </Link>
                </Col>
                <Col md={6}>
                  <Link to="/dashboard/profile">
                    <Button variant="success" block>
                      Kelola Profile
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
