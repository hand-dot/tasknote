"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp();
exports.syncProjectDetails = functions.firestore
    .document('ProjectDetails/ByUser/Users/{uid}').onWrite((change, context) => {
    console.error(change);
    console.error(context);
    const uid = 'something';
    const collection = admin
        .firestore()
        .collection(`ProjectDetails/ByProject/Projects/${uid}/`);
    console.error(collection.get());
});
//# sourceMappingURL=index.js.map