import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

class SideDrawer extends Component {
    render() {
        return (
            <View
                style={[
                    styles.container,
                    // Dimensions is a helper object that let’s us find out the dimensions of the device we’re running on
                    //gets the window's dimensions
                    { width: Dimensions.get("window").width * 0.8 }
                ]}
            >
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1
    }
});

export default SideDrawer;