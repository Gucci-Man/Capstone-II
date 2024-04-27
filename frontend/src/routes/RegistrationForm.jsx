import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import.meta.env.VITE_BASE_URL;

const baseURL = import.meta.env.VITE_BASE_URL;

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',
});

// error display
const [errorMessages, setErrorMessages] = useState({}); 

const navigate = useNavigate();

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (add more robust validation)
    const errors = {};

    if (Object.keys(errors).length > 0) {
        setErrorMessages(errors);
        return;
    }

    try {
        const response = await axios.post(`${baseURL}/auth/register`, formData);

        if (response.status === 201) {
            console.log('User registered!');
            navigate('/'); // Redirect to home 
        }
    } catch (err) {
        console.log('Registration Error:', err);
        // TODO: Handle specific errors, e.g., username exists
    }
};

    return (
        <div>
            <h1>Regristration Form</h1>
            <form onSubmit={handleSubmit}>
            {errorMessages.username && <p className="error">{errorMessages.username}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="first_name">First Name:</label>
                <input 
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input 
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
        </div>
        
    );
};

export default RegistrationForm;
