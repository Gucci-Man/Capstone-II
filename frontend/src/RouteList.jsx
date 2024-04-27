import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';
import RegistrationForm from './routes/RegistrationForm';

const RouteList = () => {
    return(
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegistrationForm />}/>
        </Routes>
    )
};

export default RouteList;