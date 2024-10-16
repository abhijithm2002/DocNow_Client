// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './ReduxStore/store';
import { SocketContextProvider } from './socket/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketContextProvider>
      <App />

    </SocketContextProvider>
  </Provider>
);
