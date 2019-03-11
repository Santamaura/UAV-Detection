import { createStore, applyMiddleware } from 'redux';
import toggleDetected from './reducers';
import logger from 'redux-logger';

const store = createStore(toggleDetected, {showDetections: []},
    applyMiddleware(logger));

export default store;
