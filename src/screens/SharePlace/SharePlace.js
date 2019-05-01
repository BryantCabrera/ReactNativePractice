import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image } from 'react-native';
// need connect to connect to redux and be able to patch props
import { connect } from 'react-redux';

// Before Module 7: Styling
// import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';
// Imports for Module 7: Styling
// import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
// Moved to PickImage.js
// import imagePlaceholder from "../../assets/beautiful-place.jpg";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

//don't need to register this as a component for navigation because you are embedding it into a screen, not loading it as a screen

class SharePlaceScreen extends Component {
    // static keyword can be accessed without having to instantiate the class
    // Has to be named “navigatorStyle”
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }

    state = {
        // placeName: ""

        // For Module 8: Validation
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
    };

    constructor(props) {
        super(props);

        // Here, we specify a navigation method whenever a navigation event occurs
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    // arrow function syntax lets you avoid binding "this"
    onNavigatorEvent = event => {
        // these types are ids defined in startMainTabs.js leftButtons property
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    // placeAddedHandler = placeName => {
    //     this.props.onAddPlace(placeName);
    // }

    // Added halfway through Module 7
    placeNameChangedHandler = val => {
        // this.setState({
        //     placeName: val
        // });

        // For Module 8: Validation
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    placeAddedHandler = () => {
        // if (this.state.placeName.trim() !== "") {
        //     this.props.onAddPlace(this.state.placeName);
        // }

        // For Module 8: Validation
        if (this.state.controls.placeName.value.trim() !== "") {
            this.props.onAddPlace(this.state.controls.placeName.value);
        }
    };

    render() {
        return (
            // Before Module 7: Styling
            // <View>
            //     {/* <Text>On SharePlaceScreen</Text> */}
            //     <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            // </View>

            // After Module 7: Styling
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    {/* Moved to PickImage.js <View style={styles.placeholder}>
                        <Image source={imagePlaceholder} style={styles.previewImage} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Pick Image" />
                    </View> */}
                    {/* Moved to PickLocation.js <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title="Locate Me" />
                    </View> */}
                    {/* <DefaultInput placeholder="Place Name" /> */}
                    <PlaceInput
                        // placeName={this.state.placeName}
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <View style={styles.button}>
                        <Button
                            title="Share the Place!"
                            onPress={this.placeAddedHandler}
                            disabled={!this.state.controls.placeName.valid}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

// export default SharePlaceScreen;
// null replaces MmpStatesToProps since we don't need it here
export default connect(null, mapDispatchToProps)(SharePlaceScreen);