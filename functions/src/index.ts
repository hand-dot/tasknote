import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.onUserProjectUpdate = functions.firestore
    .document('Projects/{projectId}').onWrite((change, context) => {
        let previousProjecIds = change.before.data().userIds;
        let currentProjectIds = change.after.data().userIds;
        // let [headProjectId] = currentProjectIds.filter(projectId => !previousProjecIds.includes(projectId));

        // const doc = admin.firestore().doc(`ProjectDetails/ByProject/Projects/${headProjectId}/`);

        console.error(change.before.data());
        console.error(change.after.data());

    });