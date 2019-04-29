import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// 1.	The button dynamically has its own styling based on what platform you use
// 2.	To override that, have to make your own custom button components

const buttonWithBackground = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text>{props.children}</Text>
        </View>
    </TouchableOpacity>
);

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