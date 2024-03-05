import '../Styles/Welcome.css'
// Library Imports
import React, { useEffect, useState } from "react"
import { Button, Card, Container, Row, Col, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom';
// Custom Component Imports
import Footer from './Utils/Footer.js';


function Welcome() {
    const [animation] = useState('-do')

    return (
        <div id="welcome-wrapper">
            <div id="welcome-main" className='' >
                <h1 className='text-primary' id="welcome-header">Welcome Home<sup>&trade;</sup></h1>
                <Row className="align-self-center mt-5">
                    <Col >
                        <Card className="text-center">

                            <Card.Body >
                                {/* Main company logo header */}
                                <Card.Title><h2 className={"mt-4 mb-4 draw -wave " + animation}>Our Mission</h2></Card.Title>

                                {/* Main company mission statement */}
                                <section id='welcome-text' className='mb-5'>
                                    <div className={"text-center draw -small -wave " + animation}> "Built on a firm foundation of love, Welcome Home offers the essence of family</div>
                                    <div className={"text-center draw -small -wave " + animation}> to individuals who have been justice-impacted by providing a safe justice-impacted</div>
                                    <div className={"text-center draw -wave -small " + animation}> by providing a safe haven for gathering, cherishing emotional well-being,</div>
                                    <div className={"text-center draw -wave -small " + animation} delay="2.5"> and promoting a healthy lifestyle that ensures holistic
                                        transformation."</div>
                                </section>

                                {/* Main page footer */}
                                <Card.Footer className="bg-body p-4">
                                    <Stack direction="horizontal" gap="3" className='justify-content-center'>
                                        <Button variant="primary" size="lg" as={Link} to="/login">Sign In</Button>
                                        <div className='vr' />
                                        <Button variant="outline-info" size="lg" as={Link} to="/sign-up">Sign Up</Button>
                                    </Stack>
                                </Card.Footer>
                                
                            </Card.Body>

                        </Card>

                    </Col>
                </Row>
            </div>

            <Footer />


        </div>




    );
};

export default Welcome;