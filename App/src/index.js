import { MoralisProvider } from 'react-moralis';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <MoralisProvider appId="1M3DRwK4iIFbrcX9BiKCUWPMcRfuUIEp7BTSKgf3" serverUrl="https://awkbi0rsarvu.usemoralis.com:2053/server">
      <StyledEngineProvider injectFirst>
      <App />
      </StyledEngineProvider>
      </MoralisProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
