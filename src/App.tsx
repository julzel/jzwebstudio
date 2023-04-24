import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// local imports
import Layout from './components/Layout';
import MyKitchen from './pages/gastronomy';
import Game from './pages/game';
import Home, { HomeRoutes } from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route key="home" path="/" element={<Home />}>
            <>{HomeRoutes()}</>
          </Route>
          <Route path="/game-of-life" element={<Game />} />
          <Route path="/my-kitchen" element={<MyKitchen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
