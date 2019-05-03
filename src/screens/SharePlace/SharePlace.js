import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';
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

    // Removed in Module 12: Polish
    // state = {
    //     // placeName: ""

    //     // For Module 8: Validation
    //     controls: {
    //         placeName: {
    //             value: "",
    //             valid: false,
    //             touched: false,
    //             validationRules: {
    //                 notEmpty: true
    //             }
    //         },
    //         location: {
    //             // it will then be an object with latitude and longitude
    //             value: null,
    //             valid: false
    //         },
    //         image: {
    //             value: null,
    //             valid: false
    //         }
    //     }
    // };

    constructor(props) {
        super(props);

        // Here, we specify a navigation method whenever a navigation event occurs
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    // Added componentWillMount and reset() in Module 12: Polish
    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }
        });
    };

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

    // Added locationPIckedHandler in Module 9: Maps
    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        });
    };

    // Added imagePickedHandler in Module 9: Image Picker
    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    }

    placeAddedHandler = () => {
        // if (this.state.placeName.trim() !== "") {
        //     this.props.onAddPlace(this.state.placeName);
        // }

        // For Module 8: Validation
        // if (this.state.controls.placeName.value.trim() !== "") {
        //     this.props.onAddPlace(this.state.controls.placeName.value);
        // }

        // For Module 9: Maps
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );

        // Added in Module 12: Polish
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
    };

    render() {
        // Button is for Module 10: HTTP Requests
        let submitButton = (
            <Button
                title="Share the Place!"
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        );

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }

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
                    <PickImage
                        onImagePicked={this.imagePickedHandler}
                    />
                    <PickLocation
                        onLocationPick={this.locationPickedHandler}
                    />
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
                        {/* Replaced for Module 10: HTTP Requests <Button
                            title="Share the Place!"
                            onPress={this.placeAddedHandler}
                            disabled={
                                !this.state.controls.placeName.valid ||
                                // prevents submission before you've picked a location
                                !this.state.controls.location.valid ||
                                // prevents submission if the image is invalid
                                !this.state.controls.image.valid
                            }
                        /> */}

                        {submitButton}
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

// Added mapStateToProps in Module 10: HTTP Requests
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    // return {
    //     onAddPlace: (placeName) => dispatch(addPlace(placeName))
    // };

    // For Module 9: Maps
    // also need to edit /store/actions/places.js
    // return {
    //     onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
    // };

    // For Module 9: ImagePicker
    // also need to edit /store/actions/places.js
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

// export default SharePlaceScreen;
// null replaces MmpStatesToProps since we don't need it here
// export default connect(null, mapDispatchToProps)(SharePlaceScreen);
// For Module 10: HTTP Requests
export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);