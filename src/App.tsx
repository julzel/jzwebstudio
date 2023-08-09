import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// local imports
import Layout from './components/Layout';
import CarSetup from './components/CarSetup';

function App() {
  const handleSubmit = (track: string, car: string) => {
    console.log(track, car);
  };
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CarSetup handleSubmit={handleSubmit} />} />
          {/* Additional routes can be added similarly */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
