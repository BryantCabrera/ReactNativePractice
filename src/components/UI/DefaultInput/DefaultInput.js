import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
        underlineColorAndroid="transparent"
    // Move props before style attribute so you can override them later
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        // need to split margins for Module 7: View Mode responsiveness to avoid left and right margins messing with flexbox centering
        // margin: 8
        marginTop: 8,
        marginBottom: 8
    }
});

export default defaultInput;
