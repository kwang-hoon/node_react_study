import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { applyMiddleware, configureStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import reduxThunk from 'redux-thunk'
import reducer from './_reducers'

const createStroeWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(configureStore)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider
    store={createStroeWithMiddleware(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
