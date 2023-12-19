
import React from 'react';
import ReactDOM from 'react-dom/client';
import AlertBox from './AlertBox';

const root = document.createElement('div');
const shadowRoot = root.attachShadow({ mode: 'open' });
const reactContainer = document.createElement('div');
shadowRoot.appendChild(reactContainer);
document.body.appendChild(root);

const rootReact = ReactDOM.createRoot(reactContainer);
rootReact.render(
  <React.StrictMode>
    <AlertBox />
  </React.StrictMode>
);

