import React, { Component } from 'react';
import { View, Text } from 'react-native';
// need connect to connect to redux and be able to patch props
import { connect } from "react-redux";

import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {

    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    };

    render() {
        return (
            <View>
                {/* <Text>On FindPlaceScreen</Text> */}
                <PlaceList
                    places={this.props.places}
                    onItemSelected={this.itemSelectedHandler}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

// export default FindPlaceScreen;
export default connect(mapStateToProps)(FindPlaceScreen);