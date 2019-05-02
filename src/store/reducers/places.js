// import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';
import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from '../actions/actionTypes';

const initialState = {
    places: []
    // selectedPlace: null
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
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    // Before using connect method with Navigation on PlaceDetail.js
                    // return place.key !== state.selectedPlace.key;
                    return place.key !== action.placeKey;
                })
                // selectedPlace: null
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
        default:
            return state;
    }
};

export default reducer;