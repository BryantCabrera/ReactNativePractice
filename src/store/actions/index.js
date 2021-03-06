//bundles all exports so you can conveniently import from this file only

// Don't need the following anymore after connecting to react-native-navigation
// export { addPlace, deletePlace, selectPlace, deselectPlace } from './places';

export {
    addPlace,
    deletePlace,
    getPlaces,
    placeAdded,
    startAddPlace
} from './places';
// For Module 8: Validation
export { tryAuth, authGetToken, authAutoSignIn, authLogout } from './auth';
export { uiStartLoading, uiStopLoading } from "./ui";