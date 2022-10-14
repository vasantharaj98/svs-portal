import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import{ createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import reducers from './reducers';
import { AuthProvider } from './context/AuthProvider';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
        <App />
    </AuthProvider>
    <ToastContainer />
  </Provider >
);

