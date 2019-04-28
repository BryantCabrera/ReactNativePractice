/**
 * @format
 */

//redux related code
// import React from 'react';
// import { AppRegistry } from 'react-native';
//Provider component will be connected to our store
//a wrapper for our root ocmponent
// import { Provider } from 'react-redux';
// import App from './App';
// import { name as appName } from './app.json';
// import configureStore from './src/store/configureStore';

//could pass extra configuration ot the argument of configureStore()
// const store = configureStore();

// const RNRedux = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

//register component expects to get a function that returns another function that thenr eturns JSX
// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => RNRedux);


// With React Native Nagivation
//no longer need to use AppRegistry
// import { AppRegistry } from 'react-native';
import App from './App';

//no longer need to use AppRegistry
// AppRegistry.registerComponent(appName, () => App);