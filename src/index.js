import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import weatherReducer from './store/reducers/weather';
import { watchWeather } from './store/sagas/index.js';

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools : null || compose;
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  weather: weatherReducer,
  auth: null
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)
sagaMiddleware.run(watchWeather)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
