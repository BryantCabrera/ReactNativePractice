import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";

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

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
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

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }

        return (
            <View style={styles.container}>
                {/* Before Module 9: Maps <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View> */}
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                >
                    {marker}
                </MapView>

                <View style={styles.button}>
                <Button title="Locate Me" onPress={() => alert('Pick Location!')} />
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
