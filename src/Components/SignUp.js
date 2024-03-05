import '../Styles/Forms.css'
// Library imports
import React, { useEffect, useState } from "react"
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom"
// API imports
import { UserApi } from "../Api/UserApi"
// Custom Component Imports
import Footer from './Utils/Footer';



const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    

    // Handles data input and updates data to be sent to backend
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submits form data to backend to be processed
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity()) {
            UserApi.create(formData)
                .then(res => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else navigate('/')
                })

        } else e.stopPropagation();
    };

    return (
        <div id="form-wrapper">
            <div id="login-main" >
                <h1 className='text-primary' id="welcome-header">Sign Up</h1>
                <Row className="justify-content-center mt-5">
                    <Card id="signup-card" className="text-center pt-4 px-4">
                        <Card.Body >

                            {/* Main form body */}
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-primary">
                                <Form.Group controlId="formBasicName" className="text-start">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {/* Displays error */}
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail" className="text-start mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {/* Displays error */}
                                    <Form.Control.Feedback type="invalid">
                                        Please enter an email.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className='mt-3 text-start mt-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {/* Displays error */}
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a password.
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <div id="login-buttons" className='pb-4'>

                                    <Button id="login-signup-submit" variant="primary" type="submit" className="w-100 mt-4 mb-3">Sign Up</Button>

                                    <hr></hr>
                                    <Button id="login-submit" variant="outline-info" as={Link} to="/login" className="w-100 mt-2">
                                        Login
                                    </Button>
                                    <Button id="login-signup-submit" variant="outline-danger" as={Link} to="/" className="w-100 mt-2">Back to Home</Button>

                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
            <Footer />
        </div>
    );
};



export default SignUp