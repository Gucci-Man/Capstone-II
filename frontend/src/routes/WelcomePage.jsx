import React, { useEffect} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import LoginForm from './LoginForm';

const WelcomePage = ({token}) => {
    const navigate = useNavigate();

    useEffect(() => {
        // if token is available, redirect to user homepage since user is already login
        if(token && localStorage.getItem('token')) {
            navigate('/home', {replace: true}); // prevent user from going to previous page
        }
    }, [token]); // 
    
    return (
        <div>
            <h1>Welcome!</h1>
            <LoginForm />
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default WelcomePage;