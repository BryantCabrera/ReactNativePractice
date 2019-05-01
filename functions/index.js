const functions = require('firebase-functions');
// origin: true allows any origin to access it
const cors = require("cors")({ origin: true });
// file service is a default node.js package
const fs = require("fs");

const gcconfig = {
    // the projectId associated with this project
    projectId: "YOUR_PROJECT_ID",
    // file you can download from your firebase project that holds credentials
    keyFilename: "awesome-places.json"
};

// to have access rights, we need to pass some configuration
const gcs = require("@google-cloud/storage")(gcconfig);

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
        // extracts image
        const body = JSON.parse(request.body);

        // /tmp/ is A folder firebase cloud functions have access to and a folder that will be cleared regularly
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
            console.log(err);
            return response.status(500).json({ error: err });
        });

        const bucket = gcs.bucket("YOUR_PROJECT_ID.appspot.com");
        const uuid = UUID();

        bucket.upload(
            "/tmp/uploaded-image.jpg",
            {
                uploadType: "media",
                destination: "/places/" + uuid + ".jpg",
                metadata: {
                    metadata: {
                        contentType: "image/jpeg",
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            },
            (err, file) => {
                if (!err) {
                    response.status(201).json({
                        imageUrl:
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
    });

    response.send("Hello from Firebase!");
});
