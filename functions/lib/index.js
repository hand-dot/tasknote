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
        const result = yield doc.update(callback(projectIds));
        return result;
    }));
    const addProject = projectIds => ({ projectIds: R.merge(projectIds, { [context.params.projectId]: true }) });
    const removeProject = projectIds => ({ projectIds: R.omit([context.params.projectId], projectIds) });
    const promises = R.concat(R.map(updateProjectIds(addProject), (R.keys(newUsers))), R.map(updateProjectIds(removeProject), (R.keys(oldUsers))));
    return Promise.all(promises);
});
//# sourceMappingURL=index.js.map