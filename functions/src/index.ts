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

        const updateProjectIds = R.curry(async (callback, userId) => {
            const doc = admin.firestore().doc(`Users/${userId}`);
            const projectIds = R.propOr([], 'projectIds', (await doc.get()).data());
            const result = await doc.update(callback(projectIds))
            console.log('A project has been updated', result);
        });

        const addProject = projectIds => ({ projectIds: [context.params.projectId].concat(projectIds) });
        const removeProject = projectIds => ({ projectIds: R.difference(projectIds, [context.params.projectId]) });

        R.forEach(updateProjectIds(addProject), newUsers);
        R.forEach(updateProjectIds(removeProject), oldUsers);
    });