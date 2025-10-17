import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
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
        <App />
      </I18nProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
