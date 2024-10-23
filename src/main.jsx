// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './ReduxStore/store';
import { SocketContextProvider } from './socket/SocketContext';
import { NextUIProvider } from '@nextui-org/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketContextProvider>
      <NextUIProvider>
        <App />

      </NextUIProvider>

    </SocketContextProvider>
  </Provider>
);
