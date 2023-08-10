import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// local imports
import Layout from './components/Layout';
import CarSetup from './components/CarSetup';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CarSetup />} />
          {/* Additional routes can be added similarly */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
