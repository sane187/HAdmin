import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import { Provider } from 'react-redux';
import App from './App';
import "./assets/fonts/Inter-VariableFont_slnt.ttf";
import './assets/fonts/Nunito-VariableFont_wght.ttf';
import "./assets/fonts/PressStart2P-Regular.ttf"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './index.css';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
function saveToLocalStorage(state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
}

function loadFromLocalStorage() {
const serializedState = localStorage.getItem('state');
if (serializedState === null) return undefined;
 return JSON.parse(serializedState);
}
const presistedState = loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,presistedState,composeEnhancers(applyMiddleware(thunk)))
store.subscribe(() => saveToLocalStorage(store.getState()));
ReactDOM.render(

  <Provider store={store}>
        <App />
  </Provider>

    ,
  document.getElementById('root')
);
