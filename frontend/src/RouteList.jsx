import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';

const RouteList = () => {
    return(
        <Routes>
            <Route path="/" element={<WelcomePage />} />
        </Routes>
    )
};

export default RouteList;