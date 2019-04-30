import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    // Move props before style attribute so you can override them later
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
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
    },
    //  Added in Module 8: Validation
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: "red"
    }
});

export default defaultInput;
