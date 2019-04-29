import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from "react-redux";

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

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);

        // Removes the current page from the stack, hence "navigating back"
        this.props.navigator.pop();
    }

    render() {
        return (
            // <Modal
            // onRequestClose={props.onModalClosed}
            // visible={props.selectedPlace !== null}
            // animationType="slide">
            // <View style={styles.modalContainer}>
            <View style={styles.container}>
                {/* <Image source={props.selectedPlace ? props.selectedPlace.image : null}/>
                    <Text>{props.selectedPlace.name}</Text> */}
                {/* replaced with connection to React Native Navigation {modalContent} */}
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    {/* <Button title="Delete" color="red" onPress={props.onItemDeleted}/> */}
                    {/* before connecting React Native Navigator: <TouchableOpacity onPress={props.onItemDeleted}> */}
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Icon
                                size={30}
                                // name="ios-trash"
                                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                color="red" />
                        </View>
                    </TouchableOpacity>
                    {/* before connecting React Native Navigator: <Button title="Close" onPress={props.onModalClosed}/> */}
                </View>
            </View>
            // </Modal>
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
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

// export default placeDetail;
export default connect(null, mapDispatchToProps)(PlaceDetail);