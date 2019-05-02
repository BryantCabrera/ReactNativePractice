// AsyncStorage is a react native component that helps you store key value pairs
    // Will automatically pick the right storage depending on what system it’s running on
        // For Android, it will pick SQLite
import { AsyncStorage } from "react-native";

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

const API_KEY = "AIzaSyDzuG1WWDn3Sbfva0eqVmBXcu49HJojOCA";

// authMode parameter added in Module 11: Auth
export const tryAuth = (authData, authMode) => {
    // Replaced in Module 11: Auth
    // return {
    //     type: TRY_AUTH,
    //     authData: authData
    // };

    // For Module 11: Auth
    // return dispatch => {
    //     dispatch(authSignup(authData));
    // };

    // Because sign up and login have the same body payload, we just reuse the code for both and only change based on authMode
    return dispatch => {
        dispatch(uiStartLoading());

        // const apiKey = "AIzaSyDzuG1WWDn3Sbfva0eqVmBXcu49HJojOCA";

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;

        // the only different between signup and login is this url
        if (authMode === "signup") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY
        }

        fetch(
            url,
            {
                method: "POST",
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());

                // if (parsedRes.error) {
                // throws alert if no idToken
                if (!parsedRes.idToken) {
                    alert("Authentication failed, please try again!");
                } else {
                    dispatch(
                        authSetToken(
                        parsedRes.idToken,
                        parsedRes.expiresIn,
                        parsedRes.refreshToken
                        )
                    );

                    startMainTabs();
                }
            });
    };
};

// export const authSignup = (authData) => {
//     return dispatch => {
//         // to find your key: firebase console > gear > API Key
//             //  OLD WAY: firebase console > authentication > web setup in top right > copy apiKey
//         fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDzuG1WWDn3Sbfva0eqVmBXcu49HJojOCA", {
//             method: "POST",
//             body: JSON.stringify({
//                 email: authData.email,
//                 password: authData.password,
//                 returnSecureToken: true
//             }),
//             // also need headers for Firebase
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .catch(err => {
//                 console.log(err);

//                 alert("Authentication failed, please try again!");

//                 dispatch(uiStopLoading());
//             })
//             .then(res => res.json())
//             .then(parsedRes => {
//                 // need to make sure to handle errors responses, like 4xx and 5xx
//                 // console.log(parsedRes);

//                 dispatch(uiStopLoading());

//                 // will only be there if we got the error object in response
//                 if (parsedRes.error) {
//                     alert("Authentication failed, please try again!");
//                 } else {
//                     startMainTabs();
//                 }
//             });
//     };
// };

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    };
};

// can use authGetToken as a helper function anywhere in our app
export const authGetToken = () => {
    return (dispatch, getState) => {
        // redux thunk lets you return a promise
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;

            if (!token) {
                // reject();

                // Added in Module 11: when connecting to AsyncStorage
                // gets token from storage in case it is missing from redux
                let fetchedToken;

                AsyncStorage.getItem("rnp:auth:token")
                .catch(err => reject())
                .then(tokenFromStorage => {
                    fetchedToken = tokenFromStorage;

                    if (!tokenFromStorage) {
                        reject();
                        return;
                    }

                    return AsyncStorage.getItem("rnp:auth:expiryDate");
                })
                .then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));

                    const now = new Date();

                    if (parsedExpiryDate > now) {
                        // token is still valid because it will expire in the future
                        dispatch(authSetToken(fetchedToken));

                        resolve(fetchedToken);
                    } else {
                        // fails if the expiry date has passed OR if we can't get token and the date is null
                        reject();
                    }

                })
                .catch(err => reject());
            } else {
                resolve(token);
            }
        });

        // promise.catch(err => {
        //     dispatch(authClearStorage());
        // });

        // make sure to return promise
        return promise
        .catch(err => {
            return AsyncStorage.getItem("ap:auth:refreshToken")
                .then(refreshToken => {
                    return fetch(
                        "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "grant_type=refresh_token&refresh_token=" + refreshToken
                        }
                    );
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (parsedRes.id_token) {
                        console.log("Refresh token worked!");

                        dispatch(
                            authStoreToken(
                                parsedRes.id_token,
                                parsedRes.expires_in,
                                parsedRes.refresh_token
                            )
                        );

                        // we don't want to just store it for the future, we want to use it immediately
                        return parsedRes.id_token;
                    } else {
                        dispatch(authClearStorage());
                    }
                });
        })
        .then(token => {
            if (!token) {
                // ensures we make it into the .catch() block in authAutoSignIn()
                throw new Error();
            } else {
                return token;
            }
        });   
    };
};

// Added in Module 11: Token AsyncStorage
export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token));

        const now = new Date();
        // multiply by 1000 because it is in milliseconds
        const expiryDate = now.getTime() + expiresIn * 1000;
        // check it with console.log(now, new Date(expiryDate));

        // setItem can be anything you name it, any string you want, just a clear identifier
            // AsyncStorage only accepts strings, so we need .toString()
        AsyncStorage.setItem("rnp:auth:token", token);
        AsyncStorage.setItem("rnp:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("rnp:auth:refreshToken", refreshToken);
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        // make sure authGetToken is invoked ()
        dispatch(authGetToken())
        .then(token => {
            startMainTabs();
        })
        .catch(err => console.log("Failed to fetch token!"));
    };
};

// not strictly required because it doesn't take too much space, but do it anyway
export const authClearStorage = () => {
    // dispatch doesn't do anything here, it's just a helper function, either way, it's ok
    return dispatch => {
        AsyncStorage.removeItem("rnp:auth:token");
        AsyncStorage.removeItem("rnp:auth:expiryDate");
    };
};