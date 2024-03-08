import '../Styles/EnterMenu.css'
// Library Imports
import React, { useEffect, useState } from "react"
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { TextField, InputAdornment, FormGroup } from '@mui/material';
import { Button as Btn } from '@mui/material'
// API Imports
import { MenuApi } from '../Api/MenuApi.js'
// Custom Component Imports
import Error from './Utils/Error.js'
import DragDropInput from './Utils/DragDropInput.js';


export default function EnterMenu() {
    const meals = ['breakfast', 'lunch', 'dinner']
    // State to hold form data
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState([]);
    const [validated, setValidated] = useState(false);
    // const [errors, setErrors] = useState();

    // Handles general input events
    const handleChange = (e, idx) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submits form data to backend
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        formData['files'] = files

        setValidated(true);
        if (form.checkValidity()) {
            MenuApi.create(formData)
        } else e.stopPropagation();

    };

    return (
        <div id="enterMenuForm-wrapper" className='h-auto w-full p-2 lg:w-2/3 d-grid-item'>
            <div id="form-main" >
                <Row className="justify-content-center mt-5">
                    <Card id="form-card" className="text-center pt-4 px-4">
                        <Card.Body >

                            {/* Main form body */}
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-primary">
                                {
                                    // Generates inputs for each corresponding meal
                                    meals.map((meal, index) => (
                                        <div key={index} >

                                            <Form.Label><h2>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2></Form.Label>
                                            <Form.Group className="text-start">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter main entree"
                                                    name={meal + 'Entree'}
                                                    value={formData[meal + 'Entree'] ?? ''}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {/* Display error message */}
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter an Entree.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="text-start">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    placeholder="Description/Additional Info"
                                                    name={meal + 'Info'}
                                                    value={formData[meal + 'Info'] ?? ''}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {/* Display error message */}
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter more information.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="text-start">
                                                <Form.Control
                                                    className="text-md"
                                                    type="time"
                                                    name={meal + 'Time'}
                                                    value={formData[meal + 'Time'] ?? ''}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {/* Display error message */}
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter a time.
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <DragDropInput files={files} setFiles={setFiles} idx={index} />
                                            <hr />
                                        </div>
                                    ))
                                }

                                <Form.Label><h2>Snacks & Beverages</h2></Form.Label>
                                <SnacksAndBevInput handleChange={handleChange} setFormData={setFormData} />

                                {/* Submit form button */}
                                <Button variant="primary" type="submit" className="w-100 mt-4 mb-3">Submit</Button>
                            </Form>

                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
    );
};


function SnacksAndBevInput({ handleChange, setFormData }) {
    const [count, setCount] = useState(0);
    const [inputs, setInputs] = useState(Array.from({ length: count }, () => ''));

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        setFormData((prevData) => ({
            ...prevData,
            snacksAndBev: inputs,
        }));
    };

    const handleCountChange = (event) => {
        const newCount = event.target.value;
        setCount(newCount);
        setInputs(Array.from({ length: newCount }, () => ''));
    };

    return (
        <FormGroup className='flex-nowrap'>
            <div className='d-flex align-self-center'>

                <TextField
                    size='small'
                    label="How many snacks/drinks?"
                    type='number'
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                    value={count}
                    onChange={handleCountChange}
                />

            </div>

            <div className='d-flex flex-wrap justify-content-center'>
                {inputs.map((input, index) => (

                    <TextField
                        key={index}
                        name={`snacksAndBev${index}`}
                        label="Enter a snack or drink"
                        variant="outlined"
                        sx={{ m: 1, width: '25ch' }}
                        value={input}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />

                ))}

            </div>

        </FormGroup>

    )
}