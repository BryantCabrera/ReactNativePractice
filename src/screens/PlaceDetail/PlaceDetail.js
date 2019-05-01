import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";
import MapView from "react-native-maps";

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';

// When connecting Navigation to component, turned this inot a class based component
// const placeDetail = (props) => {
class PlaceDetail extends Component {
    // let modalContent = null;

    // Makes sure modal content isn't loaded too early
    // if (props.selectedPlace) {
    //     modalContent = (
    //         <View>
    //             <Image source={props.selectedPlace.image} style={styles.placeImage}/>
    //             <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
    //         </View>
    //     );
    // }

    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);

        // Removes the current page from the stack, hence "navigating back"
        this.props.navigator.pop();
    }

    render() {
        return (
            // // Before cleaning this up in Module 7: Assignment 2
            // // <Modal
            // // onRequestClose={props.onModalClosed}
            // // visible={props.selectedPlace !== null}
            // // animationType="slide">
            // // <View style={styles.modalContainer}>
            // <View style={styles.container}>
            //     {/* <Image source={props.selectedPlace ? props.selectedPlace.image : null}/>
            //         <Text>{props.selectedPlace.name}</Text> */}
            //     {/* replaced with connection to React Native Navigation {modalContent} */}
            //     <View>
            //         <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
            //         <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            //     </View>
            //     <View>
            //         {/* <Button title="Delete" color="red" onPress={props.onItemDeleted}/> */}
            //         {/* before connecting React Native Navigator: <TouchableOpacity onPress={props.onItemDeleted}> */}
            //         <TouchableOpacity onPress={this.placeDeletedHandler}>
            //             <View style={styles.deleteButton}>
            //                 <Icon
            //                     size={30}
            //                     // name="ios-trash"
            //                     name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            //                     color="red" />
            //             </View>
            //         </TouchableOpacity>
            //         {/* before connecting React Native Navigator: <Button title="Close" onPress={props.onModalClosed}/> */}
            //     </View>
            // </View>
            // // </Modal>

            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                        ? styles.portraitContainer
                        : styles.landscapeContainer
                ]}
            >
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={this.props.selectedPlace.image}
                            style={styles.placeImage}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta:
                                    Dimensions.get("window").width /
                                    Dimensions.get("window").height *
                                    0.0122
                            }}
                            style={styles.map}
                        >
                            {/* Doesn't need to be conditional because there will be no case where we'll try to render this without having the marker */}
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            {this.props.selectedPlace.name}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // modalContainer: {
    //     margin: 22
    // },
    container: {
        margin: 22
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    // Added in Module 9: Maps
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        width: "100%",
        // height: 200
        // want to make sure the image doesn't underlap the map
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    // Added in Module 9: Maps
    map: {
        // preconfigured styles that ensure the map will fill the surrounding container
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

// export default placeDetail;
export default connect(null, mapDispatchToProps)(PlaceDetail);