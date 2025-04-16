import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import Quiz from './components/Quiz';
import { Register } from './components/Register';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <Hero />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/quiz' element={<Quiz/>} />
      </Routes>
    </Router>
  );
}

export default App;