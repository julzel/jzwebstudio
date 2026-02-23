import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import Culinary from './components/Culinary';
import { I18nProvider } from './i18n/I18nProvider';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/culinary" element={<Culinary />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
