
import React, { useEffect, useState } from 'react';
import { Image, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import parking from '../../images/parking.png'
import register from '../../images/register.jpg'
import './style.css'
import Swal from 'sweetalert2'
export default function Register() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState([])
  const [confirm, setConfirm] = useState('')
  const [formError, setFormError] = useState({})
 

  const handleEmailHover = () => {
    // Set emailError state to true when hovering over the email field with an error
    setServerError([]);
  };

  const handleEmailLeave = () => {
    // Set emailError state to false when leaving the email field
    //setServerError(false);
  };

  const errors = {}
  console.log("dddd", errors)
  console.log("ser verrer", serverError)
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
  }
 
  const registerPop=()=>{
    Swal.fire({
      title: "Register Successfull!",
      text: "Enter otp recieved in your register email",
      icon: "success"
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3045/api/users/register', formData);
        // alert("Registration successful")
        localStorage.setItem('email',formData.email)
        registerPop()
        navigate('/otp')
      } catch (err) {
        console.error(err);
        setServerError(err.response?.data?.errors || []);
      }
    } else {
      setFormError(errors);
    }
  };

  const helperFunction=(name)=>{
    return serverError.filter((ele)=>{
      return ele.path===name
    }).map((ele,i)=>{
      return <li key={i}>{ele.msg}</li>
    })
  }
  return (
    <Container fluid style={{ paddingTop: '60px', width:"100%" }}>
      <Row className="justify-content-center ">
        <Col sm={12} md={6}>
          <Image className='mt-0' src={register} fluid-style={{ height: '100vh', objectFit: 'cover' }} />
        </Col>
        <Col sm={12} md={6}>
          <Card className="w-100 mt-5" style={{ maxWidth: '26rem', height: '455px' }}>
         
            <Card.Body>            
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
          <p style={{ color: 'red' }}>{helperFunction('name')}</p>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={formError.email}
                    onMouseEnter={handleEmailHover} 
                    onMouseLeave={handleEmailLeave} 
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
                    isInvalid={formError.phone}
                    onMouseEnter={handleEmailHover} 
                    onMouseLeave={handleEmailLeave} 
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
                    isInvalid={formError.password}
                    onMouseEnter={handleEmailHover} 
                    onMouseLeave={handleEmailLeave} 
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError.password}
                  </Form.Control.Feedback>
                  <p style={{ color: 'red' }}>{helperFunction('password')}</p>
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
                    id="role-customer"
                    value="customer"
                    checked={formData.role === 'customer'}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* {serverError.length >0 && serverError.map((ele,i)=>{
        return <li key={i} style={{color:"red"}}>{ele.msg}</li>
      })} */}
                <Button className='mx-auto d-block' variant="primary" type="submit">
                  Register
                </Button>
              </Form>
              {/* <div className="text-center mt-3 mb-3">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div> */}
            </Card.Body>
          </Card>
          <Card.Footer>
           
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        
            </Card.Footer>
        </Col>
      
      </Row>
    </Container>
  );
}
