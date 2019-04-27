import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';

const intiialState = {
    places: [],
    selectedPlace: null
}

//state is the old state
//ES6 lets you set parameter to a default value
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: prevState.places.concat({
                    key: Math.random().toString(),
                    name: action.placeName,
                    image: {
                        uri: "https://i.imgur.com/KbicDVh.jpg"
                    }
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: prevState.places.filter(place => {
                    return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            };
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.placeKey;
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducer;