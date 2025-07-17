import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Current from './Componets/Current'
import Page from './Componets/page';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/portfolio" element={<Current />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
