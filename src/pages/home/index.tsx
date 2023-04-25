// Home.js
import React from 'react';
import { Route, Link, Outlet } from 'react-router-dom';
import RecipeCreator from './RecipeCreator';

import './Home.css';

export const HomeRoutes = () => {
  return (
    <>
      <Route index element={<RecipeCreator />} />
    </>
  );
};

const Home = () => {
  return (
    <div className="dashboard">
      <aside className="side">
        <ul>
          <li>
            <Link to="/">Arroz con mango</Link>
          </li>
        </ul>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
