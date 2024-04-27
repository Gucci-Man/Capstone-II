import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

function WelcomePage() {
    const initialState = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)
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
        /* alert(`Created user, ${username} w/ password ${password}`); */
        /* setFormData(initialState); */

        // username: testuser
        // password: test password

        try {
            console.log(`username is ${username} and password is ${password}`)
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            });

            // Successful login
            if (response.status === 200) {
                console.log('Login!')
            };
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <h1>This is the welcome page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    );
}

export default WelcomePage;