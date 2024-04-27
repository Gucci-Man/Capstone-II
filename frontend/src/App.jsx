import './App.css'
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RouteList from './RouteList';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <RouteList />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
