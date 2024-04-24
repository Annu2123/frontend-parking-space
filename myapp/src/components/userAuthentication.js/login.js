import *as yup from 'yup'//* all data
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik' //use to form validation and form handling
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startGetUserDetail } from '../../actions/users'
const validationLoginSchema = yup.object({//object method
    email: yup.string().email().required("email is required"),
    password: yup.string().required("password is required").min(8).max(20)
})
export default function LoginPage(props) {
    const dispatch=useDispatch()
    const { loginToast } = props
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationLoginSchema,//va;idationSchema from formik as proeprty
        validateOnChange: true,//run validation on every input change
        onSubmit: async (values, { resetForm }) => {
            const formData = {
                email: values.email,
                password: values.password
            }
            try {
                const response = await axios.post('http://localhost:3045/api/users/login', formData)
                resetForm()
                // console.log(response.data)
                const data = response.data
                localStorage.setItem('token', data.token)
                dispatch(startGetUserDetail)
                navigate("/usersControll")
                loginToast()
            } catch (err) {
                if (err.response && err.response.data) {
                    const serverErrors = err.response.data.error || []
                    // setServerErrors(serverErrors)
                    alert(serverErrors)
                    console.log(err)
                } else if (err.request) {
                    // Handle network errors
                    alert('Network error. Please check your internet connection.');
                } else {
                    alert('An unexpected error occurred. Please try again later.');
                    console.error("Unexpected error:", err)
                }
            }


        },

    })
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div>
                <h2 className="text-center mb-4 mt-4">Login</h2>
                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            size="lg"
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('email', '')}//set field error on focus
                            isInvalid={formik.touched.email && formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.email && formik.errors.email} {/* Display error message if the field has been touched and has an error */}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('password', '')}
                            isInvalid={formik.touched.password && formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-center mt-3">
                        <p>Don't have an account? <Link to="/register">Create Account</Link></p>
                    </div>
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                    </Button>
                </Form>
                <Link to="/forgotpassword" variant="primary"  className="w-100 mt-3"> forgotPassword</Link>
            </div>
        </Container>

    )
}