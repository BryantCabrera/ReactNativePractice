const functions = require('firebase-functions');
// admin added in Module 11: Auth Tokens
// admin is provided by firebase-admin to let us validate tokens
const admin = require("firebase-admin");
// origin: true allows any origin to access it
const cors = require("cors")({ origin: true });
// file service is a default node.js package
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {
    // the projectId associated with this project
    // in firebase console, go to settings page > general > Project ID
    projectId: "reactnativepract-1556642515054",

    // file you can download from your firebase project that holds credentials
    // to get this file, go to firebase console for your project
        // 1) click gear icon
        // 2) click project settings
        // 3) choose service accounts
        // 4) leave Node.js clicked
        // 5) click Generate New Private Key
        // 6) store the file that downloads in your functions folder in your project folder
            // can rename it, just make sure it ends in .json
    // make sure the value for this property is what you named that key file
    keyFilename: "reactnativepractice.json"
};

// to have access rights, we need to pass some configuration
const gcs = require("@google-cloud/storage")(gcconfig);

admin.initializeApp({
    credential: admin.credential.cert(require("./awesome-places.json"))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// Uncommented this out when initialized
// Represents a function that you will be able to target via HTTP because of the HTTPS.onRequest event listener
// .helloWorld is what will be part of the URL you target
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (
            !request.headers.authorization ||
            !request.headers.authorization.startsWith("Bearer ")
        ) {
            console.log("No token present!");
            response.status(403).json({ error: "Unauthorized" });
            return;
        }
        
        let idToken;
        
        idToken = request.headers.authorization.split("Bearer ")[1];
        
        admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedToken => {

            // extracts image
            const body = JSON.parse(request.body);

            // /tmp/ is A folder firebase cloud functions have access to and a folder that will be cleared regularly
            fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                console.log(err);
                return response.status(500).json({ error: err });
            });

            // to get bucket name
            // in firebase console > storage > get started
            // click got it
            // copy and paste the url at the top(without the gs://) into .bucket in your cloud function in VSCode

            const bucket = gcs.bucket("reactnativepract-1556642515054.appspot.com");
            const uuid = UUID();

            bucket.upload(
                "/tmp/uploaded-image.jpg",
                {
                    uploadType: "media",
                    // where it should be stored in your bucket
                    destination: "/places/" + uuid + ".jpg",
                    metadata: {
                        // need this other metadata property
                        metadata: {
                            contentType: "image/jpeg",
                            // this will be needed to get a convenient firebase download link in the end
                            firebaseStorageDownloadTokens: uuid
                        }
                    }
                },
                (err, file) => {
                    if (!err) {
                        response.status(201).json({
                            imageUrl:
                                // keeps pattern that firebase would use to store images in storage based on its own SDK
                                "https://firebasestorage.googleapis.com/v0/b/" +
                                bucket.name +
                                "/o/" +
                                encodeURIComponent(file.name) +
                                "?alt=media&token=" +
                                uuid
                        });
                    } else {
                        console.log(err);
                        response.status(500).json({ error: err });
                    }
                }
            );
        })
        .catch(error => {
            console.log("Token is invalid!");
            response.status(403).json({ error: "Unauthorized" });
        });
    });
});
