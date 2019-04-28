// Before React Native Navigation
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, { Component } from 'react';
// import { Platform, StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import PlaceInput from './src/components/PlaceInput/PlaceInput';
// import PlaceList from './src/components/PlaceList/PlaceList';
// import placeImage from './src/assets/ProfilePictureSmall.png';
// import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
// import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// class App extends Component {
//     //removed state after connecting to redux
//     // state = {
//     //     places: [],
//     //     selectedPlace: null
//     // };

//     placeAddedHandler = placeName => {
//         //abstracted to PlaceInput.js component
//         // if (this.state.placeName.trim() === '') {
//         //     return;
//         // }

//         //Math.random() is just for demo places, it won't return all unique values, you need something here that returns unique values
//         //had to add .toString() because I was getting an error when it was just a number
//         // this.setState(prevState => {
//         //     return {
//         //         places: prevState.places.concat({
//         //             key: Math.random().toString(),
//         //             name: placeName,
//         //             // image: placeImage
//         //             image: {
//         //                 uri: "https://i.imgur.com/KbicDVh.jpg"
//         //             }
//         //         })
//         //     };
//         // });

//         //After connecting to Redux
//         this.props.onAddPlace(placeName);
//     };

//     //old version before placeSelectedHandler
//     // placeDeletedHandler = key => {
//     //     this.setState( prevState => {
//     //         return {
//     //             places: prevState.places.filter(place => {
//     //                 return place.key !== key;
//     //             })
//     //         }
//     //     });
//     // }

//     placeSelectedHandler = key => {
//         // this.setState( prevState => {
//         //     return {
//         //         selectedPlace: prevState.places.find(place => {
//         //             return place.key === key;
//         //         })
//         //     };
//         // });

//         //After connecting to Redux
//         this.props.onSelectPlace(key);
//     }

//     placeDeletedHandler = key => {
//         // this.setState(prevState => {
//         //     return {
//         //         places: prevState.places.filter(place => {
//         //             return place.key !== prevState.selectedPlace.key;
//         //         }),
//         //         selectedPlace: null
//         //     };
//         // });

//         //After connecting to Redux
//         this.props.onDeletePlace();
//     }

//     modalClosedHandler = () => {
//         // this.setState({
//         //     selectedPlace: null
//         // });

//         //After connecting to Redux
//         this.props.onDeletePlace();
//     }

//     render() {
//         return (
//             // <View style={styles.container}>
//             //     <PlaceDetail 
//             //         selectedPlace={this.state.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler}
//             //     />
//             //     <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
//             //     <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler}/>
//             // </View>

//             //After connecting to Redux
//             <View style={styles.container}>
//                 <PlaceDetail 
//                     selectedPlace={this.props.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler}
//                 />
//                 <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
//                 <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler}/>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         padding: 50,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     }
// });

// //state argument is passed in automatically by connect
// const mapStateToProps = state => {
//     return {
//         places: state.places.places,
//         selectedPlace: state.places.selectedPlace
//     };
// };

// //dispatch argument is passed in automatically by connect
// const mapDispatchToProps = dispatch => {
//     return {
//         onAddPlace: (name) => dispatch(addPlace(name)),
//         onDeletePlace: () => dispatch(deletePlace()),
//         onSelectPlace: (key) => dispatch(selectPlace(key)),
//         onDeselectPlace: () => dispatch(deselectPlace()),
//     };
// };

// //1st argument has to be mapStateToProps
// //2nd argument has to be mapDispatchToProps
// export default connect(mapStateToProps, mapDispatchToProps)(App);


// With React Native Navigation
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import configureStore from "./src/store/configureStore";

const store = configureStore();

// Register Screens
Navigation.registerComponent(
    //this string is a unique identifier of that string, you can choose anything you want (app name.ScreenName)
    "awesome-places.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.SharePlaceScreen",
    () => SharePlaceScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "awesome-places.FindPlaceScreen",
    () => FindPlaceScreen,
    store,
    Provider
);

// Start a App (for React Native Navigation, not the actual "App")
Navigation.startSingleScreenApp({
    screen: {
        screen: "awesome-places.AuthScreen",
        title: "Login"
    }
});