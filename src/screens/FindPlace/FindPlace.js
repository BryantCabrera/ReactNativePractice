import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// need connect to connect to redux and be able to patch props
import { connect } from "react-redux";

import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
    // static keyword can be accessed without having to instantiate the class
    // Has to be named “navigatorStyle”
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }

    state = {
        placesLoaded: false,
        // You can call this anything you want
        // It instantiates a new Animated.Value
            //  The argument passed in is the initial vlaue
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
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

    // this has to be before placesSerachHandler because placesSearchHandler calls it
    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    // .start() starts the animation
    // can pass in a function to .start() that will be called once the animation is done
    placesSearchHandler = () => {
        // Some animations don't focus on timing, just getting the animation to look right
        // React will handle the timing passed in as 1st argument
        // toValue is the value the initial value will hit
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            // Usually set this to true to make it more performant in JavaScript
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    render() {
        let content = (
            // Wrap 2D content with Animated.View
            // can use dynamically managed value
            // style contains a JavaScript object
            <Animated.View
                style={{
                    // can only use this.state.removeAnim on Animated.View, it's not just a value
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            // .interpolate() lets you use the value managed by React and convert it to a different value
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if (this.state.placesLoaded) {
            content = (
                <Animated.View
                    style={{
                        opacity: this.state.placesAnim
                    }}
                >
                    <PlaceList
                        places={this.props.places}
                        onItemSelected={this.itemSelectedHandler}
                    />
                </Animated.View>
            );
        }

        return (
            // Before Module 7: Styling with Animations
            // <View>
            //     {/* <Text>On FindPlaceScreen</Text> */}
            //     <PlaceList
            //         places={this.props.places}
            //         onItemSelected={this.itemSelectedHandler}
            //     />
            // </View>

            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

// export default FindPlaceScreen;
export default connect(mapStateToProps)(FindPlaceScreen);