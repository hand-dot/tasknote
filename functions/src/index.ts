import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.syncProjectDetails = functions.firestore
    .document('ProjectDetails/ByUser/Users/{uid}').onWrite((change, context) => {
        const doc = admin
            .firestore()
            .doc(`ProjectDetails/ByProject/Projects/${context.params.uid}/`);

        doc.update({});
    });