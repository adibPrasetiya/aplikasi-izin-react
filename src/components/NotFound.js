import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h1 className="display-1 text-danger">404</h1>
              <h3 className="mb-4">Oops! Page Not Found</h3>
              <p className="lead">
                Sorry, the page you are looking for might have been moved or
                deleted.
              </p>
              <Link to="/" className="btn btn-primary btn-lg">
                Go Back to Home
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
