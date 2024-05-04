import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../images/parking.png'; // Make sure you have the image at this path

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState([]);
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: ""
  });

  const validation = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.role) {
      errors.role = "Role selection is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3045/api/users/register', formData);
        alert("Registration successful");
        navigate('/otp');
      } catch (err) {
        console.error(err);
        setServerError(err.response?.data?.errors || []);
      }
    } else {
      setFormError(errors);
    }
  };

  return (
    <Container fluid style={{
      height: '100vh',
      background: `url(${backgroundImage}) no-repeat center center fixed`,
      backgroundSize: 'cover',
      paddingTop: "60px"
    }}>
      <Row className="justify-content-center align-items-center" style={{ height: '100%',color:'blue' }}>
        <Col xs={12} md={6}>
          <Card style={{ width: '100%', maxWidth: '500px', margin: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Card.Body>
              <h2 className="text-center">Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!formError.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!formError.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!formError.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!formError.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="I own a space"
                    name="role"
                    id="role-owner"
                    value="owner"
                    checked={formData.role === 'owner'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="I'm looking for a space"
                    name="role"
                    id="role-searcher"
                    value="searcher"
                    checked={formData.role === 'searcher'}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                  Register
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
