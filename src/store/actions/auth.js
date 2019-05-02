import { TRY_AUTH } from './actionTypes';

export const tryAuth = (authData) => {
    // Replaced in Module 11: Auth
    // return {
    //     type: TRY_AUTH,
    //     authData: authData
    // };

    // For Module 11: Auth
    return dispatch => {
        dispatch(authSignup(authData));
    };
};

export const authSignup = (authData) => {
    return dispatch => {
        // to find your key: firebase console > gear > API Key
            //  OLD WAY: firebase console > authentication > web setup in top right > copy apiKey
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDzuG1WWDn3Sbfva0eqVmBXcu49HJojOCA", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            // also need headers for Firebase
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
            })
            .then(res => res.json())
            .then(parsedRes => {
                // need to make sure to handle errors responses, like 4xx and 5xx
                console.log(parsedRes);
            });
    };
};