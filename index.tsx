import './setupPolyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './src/app/page';
import MainLayout from './src/components/layout/MainLayout';
import './src/app/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <MainLayout>
      <Home />
    </MainLayout>
  </React.StrictMode>
);
