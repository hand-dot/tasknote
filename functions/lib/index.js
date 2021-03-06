"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
    const oldUsers = R.omit(R.keys(afterChange), beforeChange);
    ;
    const updateProjectIds = R.curry((callback, userId) => __awaiter(this, void 0, void 0, function* () {
        const doc = admin.firestore().doc(`Users/${userId}`);
        const projectIds = R.propOr({}, 'projectIds', (yield doc.get()).data());
        return yield doc.update(callback(projectIds));
    }));
    const addProject = projectIds => ({ projectIds: R.merge(projectIds, { [context.params.projectId]: true }) });
    const removeProject = projectIds => ({ projectIds: R.omit([context.params.projectId], projectIds) });
    const promises = R.concat(R.map(updateProjectIds(addProject), (R.keys(newUsers))), R.map(updateProjectIds(removeProject), (R.keys(oldUsers))));
    return Promise.all(promises);
});
// Get Project User Profiles by projectIds
exports.getUserProfiles = functions.https.onCall((data, context) => {
    const _projectIds = R.propOr([], 'projectIds')(data);
    const promise = (projectIds) => __awaiter(this, void 0, void 0, function* () {
        const getUsers = (projectId) => __awaiter(this, void 0, void 0, function* () {
            const doc = admin.firestore().doc(`Projects/${projectId}`);
            return (yield doc.get()).data().userIds;
        });
        const userIds = R.mergeAll(yield Promise.all(projectIds.map(getUsers)));
        const getProfiles = (userId) => __awaiter(this, void 0, void 0, function* () {
            const doc = admin.firestore().doc(`Users/${userId}`);
            const user = (yield doc.get()).data();
            return { [userId]: { displayName: user.profile.displayName, photoUrl: user.profile.photoURL } };
        });
        return yield Promise.all(Object.keys(userIds).map(getProfiles));
    });
    return promise(_projectIds).then(result => R.mergeAll(result));
});
//# sourceMappingURL=index.js.map