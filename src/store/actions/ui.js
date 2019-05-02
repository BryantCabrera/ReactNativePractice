import { UI_START_LOADING, UI_STOP_LOADING } from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

// we can use that in the reducer to switch some property that we then connect to our screen to then show a spinner