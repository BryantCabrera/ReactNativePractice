import React, { Component } from 'react';
import { View, Text } from 'react-native';
// need connect to connect to redux and be able to patch props
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

//don't need to register this as a component for navigation because you are embedding it into a screen, not loading it as a screen

class SharePlaceScreen extends Component {
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