import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';
import RegistrationForm from './routes/Auth/RegistrationForm';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import UserProfile from './routes/UserProfile';
import RecipePage from './routes/Recipe/RecipePage';

const RouteList = ({token, setIsLoggedIn, setToken, username}) => {
    // TODO: Add route for user recipes
    return(
        <Routes>
            <Route path="/" element={<WelcomePage token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<RegistrationForm token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/home" element={<Home token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/user/:username" element={<UserProfile token={token} username={username}/>}/>
            <Route path="/recipes" element={<RecipePage token={token} username={username}/>}/>
        </Routes>
    )
};

export default RouteList;