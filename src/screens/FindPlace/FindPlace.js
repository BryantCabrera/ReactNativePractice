import React, { Component } from 'react';
import { View, Text } from 'react-native';
// need connect to connect to redux and be able to patch props
import { connect } from "react-redux";

import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
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