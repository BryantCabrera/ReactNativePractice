import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import DefaultInput from "../UI/DefaultInput/DefaultInput";

class PlaceInput extends Component {
    state = {
        placeName: ''
    };

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        });
    };

    // Before Module 7: Styling
    // placeSubmitHandler = () => {
    //     if (this.state.placeName.trim() === '') {
    //         return;
    //     }

    //     this.props.onPlaceAdded(this.state.placeName);
    // };

    render () {
        return (
            // Before Module 7: Styling
            // <View style={styles.inputContainer}>
            //     <TextInput
            //         // style={{width: 300, borderColor: "black", borderWidth: 1}}
            //         // style={{width: 300}}
            //         style={styles.placeInput}
            //         placeholder="An Awesome Place"
            //         value={this.state.placeName}
            //         onChangeText={this.placeNameChangedHandler}
            //     />
            //     <Button
            //         title="Add"
            //         style={styles.placeButton}
            //         onPress={this.placeSubmitHandler}
            //     />
            // </View>
            <DefaultInput
                placeholder="Place Name"
                value={this.state.placeName}
                onChangeText={this.placeNameChangedHandler}
            />
        )
    }
};

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});

export default PlaceInput;