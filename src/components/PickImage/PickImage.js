import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";

// No longer needed after Module 9: Image Picker
// import imagePlaceholder from "../../assets/beautiful-place.jpg";

class PickImage extends Component {
    state = {
        pickedImaged: null
    }

    pickImageHandler = () => {
        // arguments: title, response
        // response can then be handled in arrow function body
        ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
            // all properties manged by ImagePicker library
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    // this is because image src in the render needs an object which has a uri property
                    pickedImaged: { uri: res.uri }
                });

                // forwards object to store
                // .data is a property provided by res object which will store the image as base64 data
                    // if you don't need this, next to title in .showImagePicker parameters, set noData: true
                        // this will improve performance a bit because it skips image conversion to base64 data
                this.props.onImagePicked({ uri: res.uri, base64: res.data });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    {/* No longer needed after Module 9: Image Picker <Image source={imagePlaceholder} style={styles.previewImage} /> */}
                    <Image source={this.state.pickedImaged} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    {/* No longer needed after Module 9: Image Picker <Button title="Pick Image" onPress={() => alert('Pick Image!')} /> */}
                    <Button title="Pick Image" onPress={this.pickImageHandler} />
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
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default PickImage;
