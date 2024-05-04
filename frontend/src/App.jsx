import './styles/App.css'
import React, {useState, useEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
import RouteList from './RouteList';
import NavBar from './NavBar';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is already logged in
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const checkLoggedIn = () => {
      setToken(localStorage.getItem('token')); 
      setUsername(localStorage.getItem('username')); // For accessing backend
      setIsLoggedIn(token !== null);
    }
    checkLoggedIn();
  }, [isLoggedIn, token, username]); 
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn && <NavBar token={token} username={username} setIsLoggedIn={setIsLoggedIn}/>}
        <div>
          <RouteList token={token} setIsLoggedIn={setIsLoggedIn} username={username}/>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
