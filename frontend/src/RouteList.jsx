import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';
import RegistrationForm from './routes/RegistrationForm';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import UserProfile from './routes/UserProfile';

const RouteList = ({token, setIsLoggedIn, setToken}) => {
    /* console.log(`Inside RouteList: ${token}`) */
    return(
        <Routes>
            <Route path="/" element={<WelcomePage token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/home" element={<Home token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/user/:name" element={<UserProfile token={token}/>}/>
        </Routes>
    )
};

export default RouteList;