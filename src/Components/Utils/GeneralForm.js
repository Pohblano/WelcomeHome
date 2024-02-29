// import '../../Styles/Forms.css'
// import React, { useEffect, useState } from "react"
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// import Error from './Error.js'


// export default function GeneralForm ({props}) {
//     // Initialize form state with empty values for each property
//     const initialFormData = {};
//     props.forEach(property => {
//         initialFormData[property] = '';
//     });

//     // State to hold form data
//     const [formData, setFormData] = useState(initialFormData);
//     const [validated, setValidated] = useState(false);
//     const [errors, setErrors] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic, e.g., sending data to backend
//         console.log(formData);
//         // Clear form after submission
//         setFormData(initialFormData);
//         setValidated(true);
//     };

//     return (
//         <div id="form-wrapper">
//             <div id="form-main" >
//                 <h1 className='text-primary' id="form-header">Form</h1>
//                 <Row className="justify-content-center mt-5">
//                     <Card id="form-card" className="text-center pt-4 px-4">
//                         <Card.Body >
//                             <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-primary">
//                                 {
//                                     props.map(property => (
//                                         <Form.Group key={property}  className='mt-3 text-start mt-3'>
//                                             <Form.Label>{property.charAt(0).toUpperCase() + property.slice(1)}</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder={'Enter a '+ property + ' entry'}
//                                                 name={property}
//                                                 value={formData[property]}
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 Please enter a {property}.
//                                             </Form.Control.Feedback>
//                                         </Form.Group>


//                                     ))
//                                 }
//                                 <Button id="login-signup-submit" variant="primary" type="submit" className="w-100 mt-4 mb-3">Submit</Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Row>
//             </div>
//         </div>
//     );
// };


