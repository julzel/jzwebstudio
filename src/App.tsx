import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// local imports
import Layout from './components/Layout';
import Home from './pages/home';
import Game from './pages/game';
import MyKitchen from './pages/gastronomy';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game-of-life" element={<Game />} />
          <Route path="/my-kitchen" element={<MyKitchen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
