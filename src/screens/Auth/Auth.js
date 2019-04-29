import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
    // Setting the state won’t dynamically update the state, but the event listener in the constructor will
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    };

    // Before we cleaned the Event Listener up in Module 7
    // constructor(props) {
    //     super(props);
    //     Dimensions.addEventListener("change", dims => {
    //         this.setState({
    //             viewMode:
    //                 Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    //         });
    //     });
    // }

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        // Modularized the function to remove so that we could call it in this life cycle hook
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    // Modularized this function to prevent memory leaks from not detaching event listener
    updateStyles = (dims) => {
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape"
        });
    }


    loginHandler = () => {
        startMainTabs();
    }

    render() {
        let headingText = null;

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        return (
            // Before Module 7: Updating based on View Mode
            // <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            //     <View style={styles.container}>
            //         {/* Before creating HeadingText.js component <Text>Auth Screen</Text> */}
            //         <MainText>
            //             <HeadingText>Please Log In</HeadingText>
            //         </MainText>
            //         {/* <Button title="Login" onPress={this.loginHandler} /> */}
            //         <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
            //             Switch to Login
            //         </ButtonWithBackground>
            //         <View style={styles.inputContainer}>
            //             {/* Before modulatizing components <TextInput placeholder="Your E-Mail Address" tyle={styles.input} />
            //             <TextInput placeholder="Password" tyle={styles.input} />
            //             <TextInput placeholder="Confirm Password" tyle={styles.input} /> */}

            //             <DefaultInput
            //                 placeholder="Your E-Mail Address"
            //                 style={styles.input}
            //             />
            //             <DefaultInput placeholder="Password" style={styles.input} />
            //             <DefaultInput placeholder="Confirm Password" style={styles.input} />
            //         </View>
            //         {/* <Button title="Submit" onPress={this.loginHandler} /> */}
            //         <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            //             Submit
            //         </ButtonWithBackground>
            //     </View>
            // </ImageBackground>

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
                        Switch to Login
                    </ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder="Your E-Mail Address"
                            style={styles.input}
                        />
                        <View
                            style={
                                this.state.viewMode === "portrait"
                                    ? styles.portraitPasswordContainer
                                    : styles.landscapePasswordContainer
                            }
                        >
                            <View
                                style={
                                    this.state.viewMode === "portrait"
                                        ? styles.portraitPasswordWrapper
                                        : styles.landscapePasswordWrapper
                                }
                            >
                                <DefaultInput placeholder="Password" style={styles.input} />
                            </View>
                            <View
                                style={
                                    this.state.viewMode === "portrait"
                                        ? styles.portraitPasswordWrapper
                                        : styles.landscapePasswordWrapper
                                }
                            >
                                <DefaultInput
                                    placeholder="Confirm Password"
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
                        Submit
                    </ButtonWithBackground>
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
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    }
});

export default AuthScreen;