// Home.js
import React from 'react';
import { Route, Link, Outlet } from 'react-router-dom';
import RecipeCreator from './RecipeCreator';

const HomeLanding = () => {
  return (
    <div>
      <h1>Welcome to the Home page!</h1>
    </div>
  );
};

export const HomeRoutes = () => {
  return (
    <>
      <Route index element={<HomeLanding />} />
      <Route
        key="recipe-creator"
        path="/recipe-creator"
        element={<RecipeCreator />}
        index
      />
      <Route key="link2" path="/link2" element={<h1>Content for Link 1</h1>} />
    </>
  );
};

const Home = () => {
  return (
    <div className="dashboard">
      <aside className="side">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="recipe-creator">Recipe Creator</Link>
          </li>
          <li>
            <Link to="link2">Child 2</Link>
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
