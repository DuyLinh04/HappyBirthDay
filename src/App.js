import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Greeting from './components/Greeting';
import HappyBirthday from './components/HappyBirthday';
import Wish from './components/Wish';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          {/* Default Route (Login Page) */}
          <Route path="/" element={<Login />} />
          {/* Greeting Page Route after successful login */}
          <Route path="/greeting" element={<Greeting />} />
          {/* HappyBirthday Page */}
          <Route path="/happy-birthday" element={<HappyBirthday />} />
          {/* Wish Page */}
          <Route path="/wish" element={<Wish />} />
        </Routes>
        
        
      </div>
    </Router>
  );
}

export default App;
