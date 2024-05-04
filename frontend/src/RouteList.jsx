import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './routes/WelcomePage';
import RegistrationForm from './routes/Auth/RegistrationForm';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import UserProfile from './routes/UserProfile';
import RecipePage from './routes/Recipe/RecipePage';

const RouteList = ({token, setIsLoggedIn, username}) => {
    
    return(
        <Routes>
            <Route path="/" element={<WelcomePage token={token} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<RegistrationForm token={token} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/home" element={<Home token={token} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/user/:username" element={<UserProfile token={token} username={username} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/recipes" element={<RecipePage token={token} username={username}/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};

export default RouteList;