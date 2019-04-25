/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    state = {
        placeName: '',
        places: []
    };

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === '') {
            return;
        }

        this.setState(prevState => {
            return {
                places: prevState.places.concat(prevState.placeName)
            }
        });
    };

    render() {
        const placesOutput = this.state.places.map((place, i) => (
            <Text key={i}>{place}</Text>
        ))
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        // style={{width: 300, borderColor: "black", borderWidth: 1}}
                        // style={{width: 300}}
                        style={styles.placeInput}
                        placeholder="An Awesome Place"
                        value={this.state.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler}/>
                </View>
                <View>
                    {placesOutput}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});
