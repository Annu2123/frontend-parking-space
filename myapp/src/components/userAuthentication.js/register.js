import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate=useNavigate()
  const [serverError,setServerError]=useState([])
  const [confirm,setConfirm]=useState('')
  const [formError,setFormError]=useState({})
  const errors={}
  console.log("dddd",errors)
  console.log("ser verrer",serverError)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role:""
  });
const validation=()=>{
  if(formData.name.trim().length ==0){
     errors.name="name is required"
  }
  if(formData.name.trim().length > 10){
     errors.name="name should be only 10 char"
  }
  if(formData.email.trim().length ==0){
     errors.email="email is required"
  }
  if(formData.phone.trim().length ==0){
    errors.phone="phone number is required"
  }
  if(formData.phone.trim().length <1 && formData.phone.trim().length >10){
    errors.phone="phone number should have only 10 number"
  }
  if(formData.password.trim().length == 0){
    errors.password="password is required"
  }
  if(formData.password.length <8 && formData.password.length >20){
    errors.password="password must be 8 char and 20 char long"
  }
  // if(confirm.trim().length ==0){
  //   errors.confirm="confirm the password"
  // }
  // if(confirm.trim() != formData.password){
  //   errors.confirm="confirm password in not matched with password"
  // }
  
}
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("df",errors)
  validation()
    // Handle form submission here
    if(Object.keys(errors).length==0){
      try{
        localStorage.setItem('email',formData.email)
        const response=await axios.post('http://localhost:3045/api/users/register',formData)
        console.log(response.data)
        alert("reg succesful")
        navigate('/otp')     
       }catch(err){
        console.log(err)
        setServerError(err.response.data.errors)
       }
        }else{
          setFormError(errors)
    }
  }
  const helperFunction=(name)=>{
    return serverError.filter((ele)=>{
      return ele.path === name
    }).map((ele)=>{
      return <li>{ele.msg}</li>
    })
  }
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
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
                    isInvalid={formError.name}
                  />
                   <Form.Control.Feedback type="invalid">
                            {formData.name.length==0 && formError.name}  
                     </Form.Control.Feedback>
                     {formData.name.length==0 && <p>{helperFunction('name')}</p>}
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={formError.email}
                  />
                   <Form.Control.Feedback type="invalid">
                          {formError.email && formError.email} 
                    </Form.Control.Feedback>
                    {serverError.length >0 &&  <p style={{color:'red'}}>{helperFunction('email')}</p>}
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={formError.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                            {formError.phone && formError.phone} {/* Display error message if the field has been touched and has an error */}
                        </Form.Control.Feedback>
                        {serverError.length >0 &&  <p style={{color:'red'}}>{helperFunction('phone')}</p>}
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
                  />
                  <Form.Control.Feedback type="invalid">
                        {formError.password && formError.password} {/* Display error message if the field has been touched and has an error */}
                   </Form.Control.Feedback>
                   {formData.password.length ==0 &&  <p>{helperFunction('password')}</p>}
                </Form.Group>

                {/* <Form.Group controlId="formPassword">
                  <Form.Label> Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name=""
                    value={confirm}
                    onChange={(e)=>{setConfirm(e.target.value)}}
                    isInvalid={confirm}                   
                  />
                  <Form.Control.Feedback type="invalid">
                //             {formError.confirm && formError.confirm} {/* Display error message if the field has been touched and has an error */}
                {/* //    </Form.Control.Feedback>
                // </Form.Group>  */}

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="radio"
                    label="I oen a space"
                    name="role"
                    value="owner"
                    
                    onChange={handleChange}
                    
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="radio"
                    label="I nee space"
                    name="role"
                    value="customer"
                    
                    onChange={handleChange}
                    
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
            <p>Already have an account? <Link  to="/login">Login here</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}