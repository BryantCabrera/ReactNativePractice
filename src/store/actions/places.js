// import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';
import {
    ADD_PLACE,
    DELETE_PLACE,
    SET_PLACES,
    REMOVE_PLACE,
    PLACE_ADDED,
    START_ADD_PLACE
} from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

// Added in Module 12: Polish
export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    };
};

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
        // const placeData = {
        //     name: placeName,
        //     location: location
        // };

        // // can now nest structures by adding onto the end of the URL
        // // for firebase, you have to add .json to the end of the URL
        // fetch("https://reactnativepract-1556642515054.firebaseio.com/places.json", {
        //     method: "POST",
        //     // A POST request only makes sense if we attach a body
        //     // body has to be in JSON format
        //     // JSON.stringify turns it into a string/JSON format
        //     body: JSON.stringify(placeData)
        // })
        // // can chain to the fetch request because a fetch request returns a promise
        // // catch() will only catch failed network requests, it won't catch 4xx and 5xx error codes
        // .catch(err => console.log(err))
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log(parsedRes);
        // });


        // After deploying our cloud function
        // Uploads the image, then chains until you store the rest of the data on the server, including a link to that store image
        // fetch("https://us-central1-reactnativepract-1556642515054.cloudfunctions.net/storeImage", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         image: image.base64
        //     })
        // })
        // .catch(err => console.log(err))
        // .then(res => res.json())
        // .then(parsedRes => {
        //     // this will take a little long because the image isn't small and the network speed of the simulator isn't too fast
        //     const placeData = {
        //         name: placeName,
        //         location: location,
        //         image: parsedRes.imageUrl
        //     };
        //     return fetch("https://reactnativepract-1556642515054.firebaseio.com/places.json", {
        //         method: "POST",
        //         body: JSON.stringify(placeData)
        //     })
        // })
        // .catch(err => console.log(err))
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log(parsedRes);
        // });

        // // After connecting to redux
        // // shows spinner
        // dispatch(uiStartLoading());
        // fetch("https://us-central1-reactnativepract-1556642515054.cloudfunctions.net/storeImage", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         image: image.base64
        //     })
        // })
        // .catch(err => {
        //     console.log(err);
        //     // not the best error handler, but better than staying silent
        //     alert("Something went wrong, please try again!");
        //     dispatch(uiStopLoading());
        // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     const placeData = {
        //         name: placeName,
        //         location: location,
        //         image: parsedRes.imageUrl
        //     };
        //     return fetch("https://reactnativepract-1556642515054.firebaseio.com/places.json", {
        //         method: "POST",
        //         body: JSON.stringify(placeData)
        //     })
        // })
        // // .catch(err => {
        // //     console.log(err);
        // //     alert("Something went wrong, please try again!");

        // //     // removes spinner
        // //     dispatch(uiStopLoading());
        // // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log(parsedRes);
        //     dispatch(uiStopLoading());
        // })
        // .catch(err => {
        //     console.log(err);
        //     alert("Something went wrong, please try again!");
        //     dispatch(uiStopLoading());
        // });

        // Replaced for Module 11: Auth Tokens
        dispatch(uiStartLoading());

        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found!");
        })
        .then(token => {
            authToken = token;
            return fetch(
                "https://us-central1-reactnativepract-1556642515054.cloudfunctions.net/storeImage",
                {
                    method: "POST",
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        Authorization: "Bearer " + authToken
                    }
                }
            );
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                // this triggers the next possible catch blocks
                throw new Error();
            }
        })
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch(
                "https://reactnativepract-1556642515054.firebaseio.com/places.json?auth=" +
                authToken,
                {
                    method: "POST",
                    body: JSON.stringify(placeData)
                }
            );
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then(parsedRes => {
            console.log(parsedRes);

            dispatch(uiStopLoading());
            // Added in Module 12: Polish
            dispatch(placeAdded());
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        });
    };
};

// Added in Module 12: Polish; redirects to new tab
export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    };
};

// Added getPlaces() and setPlaces() in Module 10: HTTP Requests
export const getPlaces = () => {
    return dispatch => {
        // fetch("https://reactnativepract-1556642515054.firebaseio.com/places.json")
        //     // .catch(err => {
        //     //     alert("Something went wrong, sorry :/");
        //     //     console.log(err);
        //     // })
        //     .then(res => res.json())
        //     .then(parsedRes => {
        //         const places = [];
        //         for (let key in parsedRes) {
        //             places.push({
        //                 ...parsedRes[key],
        //                 image: {
        //                     // this is parsedResponse['unique-id-from-firebase'].image
        //                     uri: parsedRes[key].image
        //                 },
        //                 key: key
        //             });
        //         }

        //         // places will be a JavaScript object where the keys will be the unique IDs from firebase and the values will be the nested objects
        //         dispatch(setPlaces(places));
        //     })
        //     .catch(err => {
        //         alert("Something went wrong, sorry :/");
        //         console.log(err);
        //     });

        // Replaced for Module 11: Auth Tokens
        dispatch(authGetToken())
        .then(token => {
            return fetch(
                "https://reactnativepract-1556642515054.firebaseio.com/places.json?auth=" +
                token
            );
        })
        .catch(() => {
            alert("No valid token found!");
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                });
            }
            dispatch(setPlaces(places));
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        });
    };
};

// the action we use when we get a response
export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

// Before using connect method with Navigation on PlaceDetail.js
// export const deletePlace = () => {
//     return {
//         type: DELETE_PLACE
//     };
// };

export const deletePlace = (key) => {
    // return {
    //     type: DELETE_PLACE,
    //     placeKey: key
    // };

    // Modified in Module 10: Assignment 6
    // return dispatch => {} allows you to run asynchronous code
    return dispatch => {
        // Replaced in Module 11: Auth
        // dispatch(removePlace(key));
        // // if removing it on the server fails, the front-end will be out of sync, could go into catch black and readd the place
        //     // creates a copy of the place
        // fetch("https://reactnativepract-1556642515054.firebaseio.com/places/" + key + ".json", {
        //     method: "DELETE"
        // })
        // // .catch(err => {
        // //     alert("Something went wrong, sorry :/");
        // //     console.log(err);
        // // })
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log("Done!");
        // })
        // .catch(err => {
        //     alert("Something went wrong, sorry :/");
        //     console.log(err);
        // });

        // For Module 11: Auth Tokens
        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found!");
        })
        .then(token => {
            dispatch(removePlace(key));
            
            return fetch(
                "https://reactnativepract-1556642515054.firebaseio.com/places/" +
                key +
                ".json?auth=" +
                token,
                {
                    method: "DELETE"
                }
            );
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then(parsedRes => {
            console.log("Done!");
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        });
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

// Added in Module 10: Assignment 6
// removes it immediately from the store and front-end so we don't have to wait for the async code in deletePlace to finish
export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};