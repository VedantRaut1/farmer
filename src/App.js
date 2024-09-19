import React from 'react';
import MarketPriceInput from './components/MarketPriceInput';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rental from "./components/Rental";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Header from './components/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CropManagement from './components/CropManagement';
function App() {
  return (
    <div className="App">
    <BrowserRouter> 
      <Header />
    <Routes>
      <Route path="/" element={<Home/>} /> 
      <Route path="/rental" element={<Rental/>} /> 
      <Route path="/weather" element={<Weather/>} /> 
      <Route path="/crops" element={<CropManagement/>}/> 
      <Route path="/prices" element={<MarketPriceInput/>}/> 
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
