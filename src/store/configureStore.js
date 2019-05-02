import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import placesReducer from './reducers/places';
import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";
    
const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer
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
    // return createStore(rootReducer, composeEnhancers());

    // Added in Module 10: HTTP Requests
    // Thunk middleware will now step in during the action creators if we follow a certain pattern
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;