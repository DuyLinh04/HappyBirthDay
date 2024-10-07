// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import Login from './components/Login';
import Greeting from './components/Greeting';
import HappyBirthday from './components/HappyBirthday';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default Route (Login Page) */}
          <Route path="/" element={<Login />} />
          {/* Greeting Page Route after successful login */}
          <Route path="/greeting" element={<Greeting />} />
          <Route path="/happy-birthday" element={<HappyBirthday />} /> {/* Trang HappyBirthDay */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
