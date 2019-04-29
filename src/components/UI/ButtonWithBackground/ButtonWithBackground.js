import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

// 1.	The button dynamically has its own styling based on what platform you use
// 2.	To override that, have to make your own custom button components

const buttonWithBackground = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color }]}>
            <Text>{props.children}</Text>
        </View>
    );

    if (Platform.OS === "android") {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }
    
    return (<TouchableOpacity onPress={props.onPress}>
        {/* <View style={[styles.button, { backgroundColor: props.color }]}>
            <Text>{props.children}</Text>
        </View> */}
        {content}
    </TouchableOpacity>);
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    }
});

export default buttonWithBackground;