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
        const beforeChange = R.propOr({}, 'userIds')(change.before.data());
        const afterChange = R.propOr({}, 'userIds')(change.after.data());
        const newUsers = R.omit(R.keys(beforeChange), afterChange);
        const oldUsers = R.omit(R.keys(afterChange), beforeChange);;

        const updateProjectIds = R.curry(async (callback, userId) => {
            const doc = admin.firestore().doc(`Users/${userId}`);
            const projectIds = R.propOr({}, 'projectIds', (await doc.get()).data());
            return await doc.update(callback(projectIds))
        });

        const addProject = projectIds => ({ projectIds: R.merge(projectIds, { [context.params.projectId]: true }) });
        const removeProject = projectIds => ({ projectIds: R.omit([context.params.projectId], projectIds) });

        const promises = R.concat(R.map(updateProjectIds(addProject), (R.keys(newUsers))), R.map(updateProjectIds(removeProject), (R.keys(oldUsers))));
        return Promise.all(promises);
    });

// Get Project User Profiles by projectIds
exports.getUserProfiles = functions.https.onCall((data, context) => {
    const _projectIds: string[] = R.propOr([], 'projectIds')(data);

    const promise = async projectIds => {
        const getUsers = async projectId => {
            const doc = admin.firestore().doc(`Projects/${projectId}`);
            return (await doc.get()).data().userIds;
        };

        const userIds: {} = R.mergeAll(await Promise.all(projectIds.map(getUsers)));

        const getProfiles = async userId => {
            const doc = admin.firestore().doc(`Users/${userId}`);
            const user = (await doc.get()).data();
            return { [userId]: { displayName: user.profile.displayName, photoUrl: user.profile.photoURL } }
        };

        return await Promise.all(Object.keys(userIds).map(getProfiles));
    };

    return promise(_projectIds).then(result => R.mergeAll(result));
});
