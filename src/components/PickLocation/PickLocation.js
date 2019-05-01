import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Text, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

class PickLocation extends Component {
    state = {
        focusedLocation: {
            // region is latitude, longitutde, the 2 deltas of these properties;  a region is a single point in a square
            // make sure you spell “longitude” and “latitude” correctly
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            // calculates aspect ratio of our device dynamically
            longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
        },
        locationChosen: false
    };

    // Uses user data to bind data to the map user clicks on
    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;

        // Arguments are region, duration
            // if you leave out duration it will automatically pick a nice one
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            // the following overwrites the latitude and longitude
            latitude: coords.latitude,
            longitude: coords.longitude
        });

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
    };

    getLocationHandler = () => {
        // navigator usually refers to react navigator
        // react native exposes .geolcation and .getCurrentPosition() to us, so we can use it to get location
        // 1st argument is a success function, executed when we successfully getch the position
        // 2nd argument is executed on fetch failure
        // 3rd argument is configuration
        navigator.geolocation.getCurrentPosition(pos => {
            // set up this code like this to be able to reuse pickLocationHandler() above
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log(err);
                alert("Fetching the Position failed, please pick one manually!");
            })
    }

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            // can still bind it to focused location because it will just take in latitude and longitutde and ignore the other 2 items
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }

        return (
            <View style={styles.container}>
                {/* Before Module 9: Maps <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View> */}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    // initial region won’t change again, so use region attribute
                    initialRegion={this.state.focusedLocation}
                    // can now omit this region property because we will animate to it
                    // region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    // react generates default parameter ref (reference) then you can bind some property of our class to this reference
                    // Generates a property to this class that creates a reference to this object
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>

                <View style={styles.button}>
                    <Button
                        title="Locate Me"
                        // onPress={() => alert('Pick Location!')}
                        onPress={this.getLocationHandler}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    // placeholder: {
    //     borderWidth: 1,
    //     borderColor: "black",
    //     backgroundColor: "#eee",
    //     width: "80%",
    //     height: 150
    // },
    map: {
        width: "100%",
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
