import './App.css'
import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import RouteList from './RouteList';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkLoggedIn = () => {
      setToken(localStorage.getItem('token'));
      setIsLoggedIn(token !== null);
    }
    checkLoggedIn();
  }, [token]); // Execute only if token is changed
  return (
    <div>
      <BrowserRouter>
        <div>
          <RouteList token={token}/>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
