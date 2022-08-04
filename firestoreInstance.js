
const admin = require("firebase-admin");
const serviceAccount = require("./task-scheduler-4f02a-firebase-adminsdk-k19jq-9e02a4f595.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.fireAdmin = admin
exports.db = db
