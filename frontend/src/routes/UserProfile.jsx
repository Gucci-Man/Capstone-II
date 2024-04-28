import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const UserProfile = ({token}) => {
    const { name } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // if token is not available, return to welcome page
        if(!token && !localStorage.getItem('token')) {
            navigate('/', {replace: true}); // prevent user from going to previous page
        } 

        const userToken = localStorage.getItem('token');
        const fetchData = async () => {
            setIsLoading(true);
            try {
                /* console.log(`token is ${userToken}`);
                console.log(`name is ${name}`) */
                const response = await axios.get(`${baseURL}/users/${name}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                console.log(response.data)
                setUserData(response.data.user);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [name]);

    // TODO: Style this better
    return (
        <div>
            {isLoading && <div>Loading user data...</div>}
            {error && <div>Error fetching data: {error.message}</div>}
            {userData && (
                <div>
                    <h1>User Profile</h1>
                    <h2>{userData.username}</h2>
                    <h4>{userData.email}</h4>
                </div>
            )}
        </div>
    );
    
}

export default UserProfile;