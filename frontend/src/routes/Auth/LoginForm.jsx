/**
 * LoginForm.jsx
 * -------------
 * Component responsible for handling user login. Includes:
 * 
 * *  Form fields for username and password.
 * *  Logic to submit login credentials to the backend API.
 * *  Error handling for invalid credentials.
 * *  Authentication state management:
 *      * Stores token in localStorage on successful login.
 *      * Updates application-level login state (setIsLoggedIn).
 *      * Redirects to home page upon successful login.
 *
 * Dependencies:
 * *  react-router-dom (useNavigate): For redirecting after login.
 *  axios: For making API requests to the backend. 
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/LoginForm.css'
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const LoginForm = ({ setIsLoggedIn }) => {
    const initialState = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already authenticated (logged in)
        // Redirects if a user is already logged in
        if (localStorage.getItem('token')) {
            navigate('/home', { replace: true });
        }
    }, [navigate]); // Add navigate as dependencies

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
    
        try {
            const response = await axios.post(`${baseURL}/auth/login`, {
                username,
                password
            });

            // Successful login
            if (response.status === 200) {

                console.log(response.data)

                // Store token and username in localStorage if successful
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);

                setIsLoggedIn(true); // set to true so that App re-renders with NavBar
                navigate('/home', {replace: true}); // Redirect to home 
            } 

        } catch (err) {
        // debugging
            console.log(err)

            if (err.response && err.response.status == 401) {
                //Specific handling for wrong username/password (display to user)
                const loginError = document.querySelector('.error-message');
                loginError.textContent = 'Invalid username or password';
                loginError.style.color = 'red';
                setFormData(initialState);
            } else {
                console.log("Login failed: ", err);
            };
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="error-message"></div> {/* Added error message */}
                <label htmlFor="username">Username</label>
                <input 
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;