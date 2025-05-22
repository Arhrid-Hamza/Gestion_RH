import { legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer.jsx'; // corrected import to reducer.jsx

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
