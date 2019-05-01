// import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

// Before Module 9: Maps
// export const addPlace = (placeName) => {
//     return {
//         type: ADD_PLACE,
//         placeName: placeName
//     };
// };

// For Module 9: Maps
// Also have to edit /reducers/places.js
export const addPlace = (placeName, location, image) => {
    // return {
    //     type: ADD_PLACE,
    //     placeName: placeName,
    //     location: location,
    //     image: image
    // };

    // Added in Module 10: HTTP Requests
    // Thunk middleware will now step in during the action creators if we follow a certain pattern
        // handles cases where we return a function, not an object
        // provides a dispatch function
        // lets you run any synchronous or asynchronous code; lets you dispatch code when function is done
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location
        };

        // can now nest structures by adding onto the end of the URL
        // for firebase, you have to add .json to the end of the URL
        fetch("https://reactnativepract-1556642515054.firebaseio.com/places.json", {
            method: "POST",
            // A POST request only makes sense if we attach a body
            // body has to be in JSON format
            // JSON.stringify turns it into a string/JSON format
            body: JSON.stringify(placeData)
        })
        // can chain to the fetch request because a fetch request returns a promise
        // catch() will only catch failed network requests, it won't catch 4xx and 5xx error codes
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};

// Before using connect method with Navigation on PlaceDetail.js
// export const deletePlace = () => {
//     return {
//         type: DELETE_PLACE
//     };
// };

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};

// Don't need the following anymore after connecting to react-native-navigation
// export const selectPlace = (key) => {
//     return {
//         type: SELECT_PLACE,
//         placeKey: key
//     };
// };

// export const deselectPlace = () => {
//     return {
//         type: DESELECT_PLACE
//     };
// };