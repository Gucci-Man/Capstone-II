import './App.css'
import React, {useState, useEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
import RouteList from './RouteList';
import NavBar from './NavBar';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  /* console.log("In App", isLoggedIn) */
  useEffect(() => {
    const checkLoggedIn = () => {
      setToken(localStorage.getItem('token'));
      setUsername(localStorage.getItem('username'));
      setIsLoggedIn(token !== null);
      /* console.log("inside useEffect App", isLoggedIn) */
    }
    checkLoggedIn();
  }, [isLoggedIn, token]); // Execute only if token is changed
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn && <NavBar token={token} username={username} setIsLoggedIn={setIsLoggedIn}/>}
        <div>
          <RouteList token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
