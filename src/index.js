import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/style/global.scss';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "redux/reducers";
import mySaga from "redux/sagas";

const composeEnhancer = process.env.NODE_ENV !== 'production' && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false
  }) : compose;
  
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeEnhancer(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
