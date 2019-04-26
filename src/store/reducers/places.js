const intiialState = {
    places: [],
    selectedPlace: null
}

//state is the old state
//ES6 lets you set parameter to a default value
const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;