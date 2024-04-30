import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const RegistrationForm = ({token, setIsLoggedIn}) => {
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

useEffect(() => {
    // Check if user is already registered
    // If so, prevent user from going back
    if (localStorage.getItem('token')) {
        navigate('/home', { replace: true });
    }
}, [navigate]); // Add navigate as dependencies

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const { username } = formData;

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

            // Store token and username in localStorage if successful
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);

            setIsLoggedIn(true); // set to true so that App re-renders with NavBar
            navigate('/home', { replace: true }); // Redirect to home 
        }
    } catch (err) {
        console.log('Registration Error:', err);
        // TODO: Handle specific errors, e.g., username exists
    }
};

    return (
        <div>
            <h1>Registration Form</h1>
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input 
                    type="text"
                    id="last_name"
                    name="lastName"
                    value={formData.lastName}
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
