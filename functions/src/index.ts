import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const R = require('ramda');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();



exports.onProjectChange = functions.firestore
    .document('Projects/{projectId}').onWrite((change, context) => {
        const beforeChange = R.propOr([], 'userIds')(change.before.data());
        const afterChange = R.propOr([], 'userIds')(change.after.data());
        const newUsers = R.filter(userId => !beforeChange.includes(userId), afterChange);
        const oldUsers = R.filter(userId => !afterChange.includes(userId), beforeChange);

        const addProject = async userId => {
            const doc = admin.firestore().doc(`Users/${userId}`);
            const projectIds = R.propOr([], 'projectIds', (await doc.get()).data());
            const result = await doc.update({ projectIds: [context.params.projectId].concat(projectIds) });
            console.log('A new project has been added', result);
        }

        const removeProject = async userId => {
            const doc = admin.firestore().doc(`Users/${userId}`);
            const projectIds = R.propOr([], 'projectIds', (await doc.get()).data());
            const result = await doc.update({ projectIds: R.difference(projectIds, [context.params.projectId]) });
            console.log('A project has been removed', result);
        }

        R.forEach(addProject, newUsers);
        R.forEach(removeProject, oldUsers);
    });