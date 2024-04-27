import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const LoginForm = () => {
    const initialState = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)

    const navigate = useNavigate();

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
            /* console.log(`username is ${username} and password is ${password}`) */
            const response = await axios.post(`${baseURL}/auth/login`, {
                username,
                password
            });

            // Successful login
            if (response.status === 200) {

                // debugging
                /* console.log(response.data.token); */

                // Store token and username in localStorage if successful
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                /* console.log(`localStorage token is ${localStorage.getItem('token')}`); */

                navigate('/home'); // Redirect to home 
            };
        } catch (err) {
        // debugging
            console.log(err)

            if (err.response && err.response.status == 401) {
                //Specific handling for wrong username/password (display to user)
                console.log("Invalid username or password");
            } else {
                console.log("Login failed: ", err);
            };
        };
    };

    return (
        // TODO: Set up redirect once successful login
        <div>
            <form onSubmit={handleSubmit}>
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