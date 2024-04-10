 import axios from "axios";
import { useState } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [stage, setStage] = useState('sendOTP'); // "sendOTP" or "verifyOTP"
    const [serverError, setServerError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const handleSend = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!email.trim()) {
            validationErrors.email = "Email is required";
        }

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = { email };
                const response = await axios.post("http://localhost:3045/api/users/forgotpassword", formData);
                console.log(response.data);
                localStorage.setItem("email", email);
                alert("OTP sent successfully");
                setStage("verifyOTP");
                setEmail("");
                setFormErrors({});
                setServerError(null);
            } catch (err) {
                console.error(err);
                setServerError('Failed to send OTP to this email. Please try again later.');
            }
        } else {
            setFormErrors(validationErrors);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!otp.trim().length==0) {
            validationErrors.otp = "OTP is required";
        }
        if (!newPassword.trim().length==0) {
            validationErrors.newPassword = "New password is required";
        }

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formData = {
                    email: localStorage.getItem("email"),
                    otp,
                    password: newPassword
                };
                const result = await axios.put("http://localhost:3045/api/users/setforgotpassword", formData);
                console.log(result.data);
                alert("Password updated successfully.");
                setFormErrors({});
                setNewPassword("");
                setOtp("");
                navigate("/login");
                setServerError(null);
            } catch (err) {
                console.log(err);
                setServerError(err.response.data.error || 'Failed to update password. Please try again.');
            }
        } else {
            setFormErrors(validationErrors);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div>
                {stage === "sendOTP" ? (
                    <>
                        {serverError && <p>{serverError}</p>}
                        <h2 className="text-center mb-4 mt-4">Forgot Password</h2>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    size="xl"
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {formErrors.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
                            </Form.Group>
                            <Button onClick={handleSend} variant="primary" className="w-100 mt-3">
                                {stage === "sendOTP" ? "Submit" : "Update Password"}
                            </Button>
                        </Form>
                    </>
                ) : (
                    <>
                        {serverError && <p>{serverError}</p>}
                        <h2 className="text-center mb-4 mt-4">Update Password</h2>
                        <Form onSubmit={handleUpdatePassword}>
                            <Form.Group controlId="formBasicOtp">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                {formErrors.otp && <span style={{ color: "red" }}>{formErrors.otp}</span>}
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Enter New Password</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {formErrors.newPassword && <span style={{ color: "red" }}>{formErrors.newPassword}</span>}
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                {stage === "sendOTP" ? "Submit" : "Update Password"}
                            </Button>
                        </Form>
                    </>
                )}
            </div>
        </Container>
    );
}

export default ForgotPassword;
