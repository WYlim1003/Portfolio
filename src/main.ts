import React from 'react';
import { createRoot } from 'react-dom/client';

import './portfolio.css';
import App from './App';

const el = document.querySelector<HTMLDivElement>('#app');
if (!el) throw new Error('Missing root element: #app');

createRoot(el).render(
  React.createElement(React.StrictMode, null, React.createElement(App)),
);
