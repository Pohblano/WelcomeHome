import '../Styles/EnterMenu.css'
// Library Imports
import React, { useEffect, useState } from "react"
import { Form, Button, Row, Card } from 'react-bootstrap';
import { TextField, InputAdornment, FormGroup } from '@mui/material';
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
    const [err, setErr] = useState();

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
        if (form.checkValidity() && files.length !== 0) {
            setErr('')
            MenuApi.create(formData)
                .catch(err => console.log(err))
        } else {
            e.stopPropagation();
            setErr('There was an error in your form. Please check that you filled out everything correctly and included images')
        }
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
                                            <hr className='border-1' />
                                            <Form.Label><h4>Snacks & Beverages</h4></Form.Label>
                                            <SnacksAndBevInput handleChange={handleChange} setFormData={setFormData} meal={meal} />
                                            <hr className='border-5' />
                                        </div>
                                    ))
                                }

                                {/* Submit form button */}
                                <Button variant="primary" type="submit" className="w-100 mt-4 mb-3">Submit</Button>
                               {
                                (err)?  <Error message={err}/>:null
                               }
                            </Form>

                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
    );
};


function SnacksAndBevInput({ setFormData, meal }) {
    const [count, setCount] = useState(0);
    const [inputs, setInputs] = useState(Array.from({ length: count }, () => ''));
    const [err, setErr] = useState('')
    const [obj, setObj] = useState({})

    // Event that updates formdata based on text input values  
    const handleInputChange = (index, e) => {
        const value = e.target.value
        const newInputs = [...inputs];
        const data = []

        setInputs(newInputs);
        newInputs[index] = value;
        newInputs.map((val, idx) => {
            const fill = {
                name: val,
                count: 0,
            }
            data.push(fill)
        });

        setFormData((prevData) => ({
            ...prevData,
            [`${meal}SnacksAndBev`]: data,
        }));


    };
    // Event that takes in nmumber and updates array used to render new inputs
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
                    label="How many snacks/beverages?"
                    type='number'
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>
                    }}
                    value={count}
                    onChange={handleCountChange}
                />
            </div>

            <hr className='w-75 align-self-center' />

            <div className='d-flex flex-column justify-content-center'>
                {/* Generate number of inputs based on number of snacks/drinks*/}
                {inputs.map((input, index) =>


                    <div key={index} className='mb-4'>
                        <TextField
                            name={`snacksAndBev${index}`}
                            label="Enter a snack or drink"
                            variant="outlined"
                            sx={{ m: 1, width: '25ch' }}
                            value={input}
                            onChange={(e) => handleInputChange(index, e)}
                        />

                    </div>

                )}

            </div>

        </FormGroup>

    )
}