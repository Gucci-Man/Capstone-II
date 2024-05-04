/**
 * WelcomePage.jsx
 * ---------------
 * Serves as the initial landing page for the application. Provides:
 *
 * *  Redirection for logged-in users: Automatically redirects to the home page if a valid token is detected.
 * *  Login form: Includes the LoginForm component for user authentication.
 * *  Link to registration: Guides new users to the registration page. 
 *
 * Dependencies:
 * *  react-router-dom (Link, useNavigate): For links and redirects.
 *  LoginForm.jsx: Component responsible for handling user login. 
 */

import React, { useEffect} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';

const WelcomePage = ({token, setIsLoggedIn}) => {
    const navigate = useNavigate();

    useEffect(() => {
        // if token is available, redirect to user homepage since user is already login
        if(token && localStorage.getItem('token')) {
            navigate('/home', {replace: true}); // prevent user from going to previous page
        }
    }, [token]); // 
    
    return (
        <div>
            <h1>Welcome to FoodieFit!</h1>
            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default WelcomePage;