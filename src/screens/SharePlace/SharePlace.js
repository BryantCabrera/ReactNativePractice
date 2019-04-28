import React, { Component } from 'react';
import { View, Text } from 'react-native';
// need connect to connect to redux and be able to patch props
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

//don't need to register this as a component for navigation because you are embedding it into a screen, not loading it as a screen

class SharePlaceScreen extends Component {
    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render() {
        return (
            <View>
                {/* <Text>On SharePlaceScreen</Text> */}
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

// export default SharePlaceScreen;
// null replaces MmpStatesToProps since we don't need it here
export default connect(null, mapDispatchToProps)(SharePlaceScreen);