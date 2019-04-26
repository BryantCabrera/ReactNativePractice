/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/ProfilePictureSmall.png';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    state = {
        places: [],
        selectedPlace: null
    };

    placeAddedHandler = placeName => {
        //abstracted to PlaceInput.js component
        // if (this.state.placeName.trim() === '') {
        //     return;
        // }

        //Math.random() is just for demo places, it won't return all unique values, you need something here that returns unique values
        //had to add .toString() because I was getting an error when it was just a number
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random().toString(),
                    name: placeName,
                    // image: placeImage
                    image: {
                        uri: "https://i.imgur.com/KbicDVh.jpg"
                    }
                })
            };
        });
    };

    //old version before placeSelectedHandler
    // placeDeletedHandler = key => {
    //     this.setState( prevState => {
    //         return {
    //             places: prevState.places.filter(place => {
    //                 return place.key !== key;
    //             })
    //         }
    //     });
    // }

    placeSelectedHandler = key => {
        this.setState( prevState => {
            return {
                selectedPlace: prevState.places.find(place => {
                    return place.key === key;
                })
            };
        });
    }

    placeDeletedHandler = key => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter(place => {
                    return place.key !== prevState.selectedPlace.key;
                }),
                selectedPlace: null
            };
        });
    }

    modalClosedHandler = () => {
        this.setState({
            selectedPlace: null
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail 
                    selectedPlace={this.state.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosedHandler}
                />
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
