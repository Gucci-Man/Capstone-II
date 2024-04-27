import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';
import RegistrationForm from './routes/RegistrationForm';
import NotFound from './routes/NotFound';

const RouteList = () => {
    return(
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<RegistrationForm />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
};

export default RouteList;