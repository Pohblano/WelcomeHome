import '../Styles/Forms.css'
// Library Imports
import React, { useState, setState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom"
// Api
import { UserApi } from "../Api/UserApi"
// Utility Components
import Error from './Utils/Error.js'
import Footer from './Utils/Footer.js';



function Login({ setToken, oldToken }) {
    // Used to navigate to another component
    const navigate = useNavigate();
    // Used to validate inputs
    const [validated, setValidated] = useState(false);
    // Data states
    const [err, setErr] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handles data input in forms
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submits form data to server
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            UserApi.login(formData)
                .then(res => {
                    if (!res.data.err) {
                        const token = res.data
                        setToken({ ...oldToken, token })
                        navigate('/')

                    } else {
                        setErr(res.data.err)
                    }
                })
        } else e.stopPropagation();

        setValidated(true);
    };



    return (
        <div id="form-wrapper">
            <div id="login-main" >
                <h1 className='text-primary' id="welcome-header">Log In</h1>
                <Row className="justify-content-center mt-5">
                    <Card id="login-card" className="text-center pt-4 px-4">
                        <Card.Body >
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-primary">

                                <Form.Group controlId="formBasicEmail" className="text-start">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter an email.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className='mt-3 text-start'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        Please enter a password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {
                                    (err) ? (
                                        <Error message={err} />
                                    ) : null
                                }


                                <div id="login-buttons" className='pb-4'>
                                    <Button id="login-submit" variant="primary" type="submit" className="w-100 mt-4 mb-1">
                                        Login
                                    </Button>
                                    <Link className='btn-link '>Forgot password?</Link>

                                    <hr></hr>
                                    <Button id="login-signup-submit" variant="outline-info" as={Link} to="/sign-up" className="w-100 mt-2">Sign Up</Button>
                                    <Button id="login-signup-submit" variant="outline-danger" as={Link} to="/" className="w-100 mt-2">Back to Home</Button>
                                </div>
                            </Form>


                        </Card.Body>
                    </Card>

                </Row>
            </div>
            <Footer />
        </div>

    )
}

export default Login;

