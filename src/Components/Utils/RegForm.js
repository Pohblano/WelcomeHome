import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

export default function RegForm(){
	const [formData, setFormData] = useState({})

	const handleChange = (e) => {
		console.log(e)
		// const [name, value] = e.target
	}

	const handleSubmit = (e) => {

	}


	return(
		<Form>

			<Form.Label>Username:</Form.Label>
			<Form.Control
			type='text'
			placeholder='Enter a username'
			name='username'
			value={''}
			onChange={handleChange}
			required
			/>

			<Form.Label>Password:</Form.Label>
			<Form.Control
			type='password'
			name='password'
			value={''}
			onChange={handleChange}
			required
			/>

			<Button type='submit' variant='primary'>Sign Up</Button>

		</Form>
		
	)
}