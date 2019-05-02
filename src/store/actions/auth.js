import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

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

        const apiKey = "AIzaSyDzuG1WWDn3Sbfva0eqVmBXcu49HJojOCA";

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;

        // the only different between signup and login is this url
        if (authMode === "signup") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey
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
                    dispatch(authSetToken(parsedRes.idToken));

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
                reject();
            } else {
                resolve(token);
            }
        });

        // make sure to return promise
        return promise;
    };
};