import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root')

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render
root.render(<App/>);

// During an update, there is no need to pass the container again
root.render(<App />);