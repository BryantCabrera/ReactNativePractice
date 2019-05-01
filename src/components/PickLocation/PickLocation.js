import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

class PickLocation extends Component {
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
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    }
});

export default PickLocation;
