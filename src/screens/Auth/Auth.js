import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";

// Removed in Module 11: Auth
// import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";

class AuthScreen extends Component {
    // Setting the state won’t dynamically update the state, but the event listener in the constructor will
        //	PROBLEM: if you refresh Auth, inupt will all turn red when empty
        // SOLUTION: keep track of when user touched the input with touched property
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
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

    // Added in Module 11: Auth Auto signin
    // it won't be executed if you just close the app and go into the app without killing it
    // it will be executed if the user did kill the app and relaunched it
    componentDidMount() {
        this.props.onAutoSignIn();
    }

    // Added in Module 8: Validation
    // Toggles between signup and login
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };

    // Modularized this function to prevent memory leaks from not detaching event listener
    updateStyles = (dims) => {
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    // Repnamed in Module 11: Auth
    // loginHandler = () => {
    authHandler = () => {
        // don't need confirmPassword here, that was just for frontend
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };

        // Replaced in Module 11: Auth
        // this.props.onLogin(authData);
        this.props.onTryAuth(authData, this.state.authMode);

        // Removed in Module 11: Auth
        // startMainTabs();
    }



    // Key is the property key in state
    // don't use this.state syntax because we only want to update the key of the particular property, so use prevState
    // **To check if this works, check Auth.js state in debugger
    updateInputState = (key, value) => {
        let connectedValue = {};

        // Checks if we have the .equalTo rule
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;

            const equalValue = this.state.controls[equalControl].value;

            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }

        this.setState(prevState => {
            return {
                controls: {
                    // ERROR: make sure when you populate prevstate, you type …prevState.propertyNameForObjectInState not …prevState because the latter will override the state for that object
                    ...prevState.controls,
                    // want to hard code and also check confirmPassword because if the user later changed just the password input, it still returned true for passwords matching
                        // make sure this confirmPassword comes 1st to avoid overriding the password check
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        // only want to render this if we are not waiting for our request to finish
        let submitButton = (
            <ButtonWithBackground
                color="#29aaf4"
                // Replaced in Module 11: Auth
                // onPress={this.loginHandler}
                onPress={this.authHandler}
                disabled={
                    (!this.state.controls.confirmPassword.valid &&
                        this.state.authMode === "signup") ||
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid
                }
            >
                Submit
            </ButtonWithBackground>
        );

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
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
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={val => this.updateInputState("confirmPassword", val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        }

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
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

            // Before Module 8: Handling User Input
            // <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            //     <View style={styles.container}>
            //         {headingText}
            //         <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
            //             Switch to Login
            //         </ButtonWithBackground>
            //         <View style={styles.inputContainer}>
            //             <DefaultInput
            //                 placeholder="Your E-Mail Address"
            //                 style={styles.input}
            //             />
            //             <View
            //                 style={
            //                     this.state.viewMode === "portrait"
            //                         ? styles.portraitPasswordContainer
            //                         : styles.landscapePasswordContainer
            //                 }
            //             >
            //                 <View
            //                     style={
            //                         this.state.viewMode === "portrait"
            //                             ? styles.portraitPasswordWrapper
            //                             : styles.landscapePasswordWrapper
            //                     }
            //                 >
            //                     <DefaultInput placeholder="Password" style={styles.input} />
            //                 </View>
            //                 <View
            //                     style={
            //                         this.state.viewMode === "portrait"
            //                             ? styles.portraitPasswordWrapper
            //                             : styles.landscapePasswordWrapper
            //                     }
            //                 >
            //                     <DefaultInput
            //                         placeholder="Confirm Password"
            //                         style={styles.input}
            //                     />
            //                 </View>
            //             </View>
            //         </View>
            //         <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            //             Submit
            //         </ButtonWithBackground>
            //     </View>
            // </ImageBackground>

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {/* behavior="padding" essentially pushes up the element */}
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.switchAuthModeHandler}
                    >
                        Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
                    </ButtonWithBackground>
                    {/* TouchableWithoutFeedback only takes 1 child element */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                placeholder="Your E-Mail Address"
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={val => this.updateInputState("email", val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <View
                                style={
                                    this.state.viewMode === "portrait" ||
                                        this.state.authMode === "login"
                                        ? styles.portraitPasswordContainer
                                        : styles.landscapePasswordContainer
                                }
                            >
                                <View
                                    style={
                                        this.state.viewMode === "portrait" ||
                                            this.state.authMode === "login"
                                            ? styles.portraitPasswordWrapper
                                            : styles.landscapePasswordWrapper
                                    }
                                >
                                    <DefaultInput
                                        placeholder="Password"
                                        style={styles.input}
                                        value={this.state.controls.password.value}
                                        onChangeText={val => this.updateInputState("password", val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        secureTextEntry
                                    />
                                </View>
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* Replaced in Module 11: Auth <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.loginHandler}
                        disabled={
                            !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
                            !this.state.controls.email.valid ||
                            !this.state.controls.password.valid
                        }
                    >
                        Submit
                    </ButtonWithBackground> */}

                    {submitButton}
                </KeyboardAvoidingView>
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

// Added mapStateToProps in Module 11: Auth to have access to store to see if we are loading or not
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Replaced in Module 11: Auth
        // onLogin: authData => dispatch(tryAuth(authData))
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        // now you can access this in this.props in this component
        onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

// Replaced in Module 11: Auth
// export default connect(null, mapDispatchToProps)(AuthScreen);
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);