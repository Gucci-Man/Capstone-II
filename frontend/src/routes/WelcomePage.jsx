import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const WelcomePage = () => {
// TODO: Set up links to register
    return (
        <div>
            <h1>Welcome!</h1>
            <LoginForm></LoginForm>
        </div>
    );
}

export default WelcomePage;