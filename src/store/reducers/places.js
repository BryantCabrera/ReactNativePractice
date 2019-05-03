// import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';
import {
    ADD_PLACE,
    DELETE_PLACE,
    SET_PLACES,
    REMOVE_PLACE,
    PLACE_ADDED,
} from '../actions/actionTypes';

const initialState = {
    places: [],
    // selectedPlace: null
    placeAdded: false
}

//state is the old state
//ES6 lets you set parameter to a default value
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // removed ADD_PLACE in Module 10: HTTP Requests because we only used it for synchronous code
        // case ADD_PLACE:
        //     return {
        //         ...state,
        //         places: state.places.concat({
        //             key: Math.random().toString(),
        //             name: action.placeName,
        //             image: {
        //                 // uri: "https://i.imgur.com/KbicDVh.jpg"

        //                 // For Module 9: Image Picker
        //                 uri: action.image.uri
        //             },
        //             // Added in Module 9: Maps
        //             location: action.location
        //         })
        //     };
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };
        // // Replaced with REMOVE_PLACE in Module 10: Assignment 6
        // case DELETE_PLACE:
        //     return {
        //         ...state,
        //         places: state.places.filter(place => {
        //             // Before using connect method with Navigation on PlaceDetail.js
        //             // return place.key !== state.selectedPlace.key;
        //             return place.key !== action.placeKey;
        //         })
        //         // selectedPlace: null
        //     };
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.key;
                })
            };
        // Don't need the following anymore after connecting to react-native-navigation
        // case SELECT_PLACE:
        //     return {
        //         ...state,
        //         selectedPlace: state.places.find(place => {
        //             return place.key === action.placeKey;
        //         })
        //     };
        // case DESELECT_PLACE:
        //     return {
        //         ...state,
        //         selectedPlace: null
        //     };
        // Added in Module 12: Polish
        case PLACE_ADDED:
            return {
                ...state,
                placeAdded: true
            };
        default:
            return state;
    }
};

export default reducer;