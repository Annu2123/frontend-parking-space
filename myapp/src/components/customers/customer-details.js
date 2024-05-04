import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomerDetails() {
    const customer = useSelector(state => state.users.users);
    return (
        <Container className="mt-5" style={{paddingTop:"60px"}}>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card style={{ borderColor: '#4A90E2' }}>
                        <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
                            <span style={{ color: 'black' }}>Account Details</span>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    Edit
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/update-password">Update Password</Dropdown.Item>
                                    {/* Add more dropdown items here if needed */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text><strong style={{ color: 'black' }}>Name:</strong> {customer && customer.name}</Card.Text>
                            <Card.Text><strong style={{ color: 'black' }}>Email:</strong> {customer && customer.email}</Card.Text>
                            <Card.Text><strong style={{ color: 'black' }}>Phone:</strong> {customer && customer.phone}</Card.Text>
                            <Card.Text><strong style={{ color: 'black' }}>Role:</strong> {customer && customer.role}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
