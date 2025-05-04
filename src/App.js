import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Componets/Landing'
import Current from './Componets/Current'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/current" element={<Current />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
