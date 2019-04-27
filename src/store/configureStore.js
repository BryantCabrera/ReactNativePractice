import { createStore, combineReducers, compose } from 'redux';

import placesReducer from './reducers/places';
    
const rootReducer = combineReducers({
    places: placesReducer
});

let composeEnhancers = compose;

//__DEV__ is provided by react native that is only exposed if you're in development mode
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    // return createStore(rootReducer);

    // With connection to redux developer tools
    // We can pass apply middleware to composeEnhancers() because redux dev tools are not a middleware
    return createStore(rootReducer, composeEnhancers());
}

export default configureStore;