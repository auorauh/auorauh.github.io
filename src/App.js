import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Current from './Componets/Current'
import Page from './Componets/page';

function App() {
  return (
    <Router>
      <HelmetProvider>
      <div>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/portfolio" element={<Current />} />
        </Routes>
      </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;
