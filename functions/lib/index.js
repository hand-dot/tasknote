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
    const beforeChange = R.propOr([], 'userIds')(change.before.data());
    const afterChange = R.propOr([], 'userIds')(change.after.data());
    const newUsers = R.filter(userId => !beforeChange.includes(userId), afterChange);
    const oldUsers = R.filter(userId => !afterChange.includes(userId), beforeChange);
    const addProject = (userId) => __awaiter(this, void 0, void 0, function* () {
        const doc = admin.firestore().doc(`Users/${userId}`);
        const projectIds = R.propOr([], 'projectIds', (yield doc.get()).data());
        const result = yield doc.update({ projectIds: [context.params.projectId].concat(projectIds) });
        console.log('A new project has been added', result);
    });
    const removeProject = (userId) => __awaiter(this, void 0, void 0, function* () {
        const doc = admin.firestore().doc(`Users/${userId}`);
        const projectIds = R.propOr([], 'projectIds', (yield doc.get()).data());
        const result = yield doc.update({ projectIds: R.difference(projectIds, [context.params.projectId]) });
        console.log('A project has been removed', result);
    });
    R.forEach(addProject, newUsers);
    R.forEach(removeProject, oldUsers);
});
//# sourceMappingURL=index.js.map