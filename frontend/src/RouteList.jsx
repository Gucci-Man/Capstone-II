import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';
import RegistrationForm from './routes/RegistrationForm';
import NotFound from './routes/NotFound';
import Home from './routes/Home';

const RouteList = () => {
    return(
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
};

export default RouteList;