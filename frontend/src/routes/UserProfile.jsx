import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../styles/UserProfile.css';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const UserProfile = ({token, setIsLoggedIn}) => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const userToken = localStorage.getItem('token');
            const response = await axios.delete(`${baseURL}/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                // Clear token from localStorage
                localStorage.removeItem('token');

                // Clear username from localStorage
                localStorage.removeItem('username');

                // Update login state to re-render App
                setIsLoggedIn(false);

                // Redirect to the Welcome page
                navigate('/', {replace: true});
            }
        } catch (err) {
            // Handle error
            setError(err);
        }
    }

    useEffect(() => {
        // if token is not available, return to welcome page
        if(!token && !localStorage.getItem('token')) {
            navigate('/', {replace: true}); // prevent user from going to previous page
        } 

        const userToken = localStorage.getItem('token');
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${baseURL}/users/${username}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setUserData(response.data.user);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [username]);

    // Add delete button
    return (
        <div className="profile-container">
            {isLoading && <div>Loading user data...</div>}
            {error && <div className="error-message">Error fetching data: {error.message}</div>}
                <div>
                    {userData && (
                        <section className="profile-info">
                            <header>
                                <h1>About Me</h1>
                            </header>
                            <ul className="profile-details">
                                <li><strong>Username:</strong> {userData.username}</li>
                                <li><strong>Email:</strong> {userData.email}</li>
                                <li><strong>First Name:</strong> {userData.firstName}</li>
                                <li><strong>Last Name:</strong> {userData.lastName}</li>
                            </ul>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete User</button>
                        </section>
                    )}
                </div>
        </div>
    );
    
}

export default UserProfile;