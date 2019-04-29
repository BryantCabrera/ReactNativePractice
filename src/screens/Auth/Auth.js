import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View>
                    {/* Before creating HeadingText.js component <Text>Auth Screen</Text> */}
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <Button title="Login" onPress={this.loginHandler} />
                    <View style={styles.inputContainer}>
                        {/* Before modulatizing components <TextInput placeholder="Your E-Mail Address" tyle={styles.input} />
                        <TextInput placeholder="Password" tyle={styles.input} />
                        <TextInput placeholder="Confirm Password" tyle={styles.input} /> */}

                        <DefaultInput
                            placeholder="Your E-Mail Address"
                            style={styles.input}
                        />
                        <DefaultInput placeholder="Password" style={styles.input} />
                        <DefaultInput placeholder="Confirm Password" style={styles.input} />
                    </View>
                    <Button title="Submit" onPress={this.loginHandler} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    }
});

export default AuthScreen;