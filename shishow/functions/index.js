const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// firestoreへの参照
const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
    db.collection("USER")
    .doc('i@gmail.com')
    .get()
    // eslint-disable-next-line promise/always-return
    .then(doc1 => {
        response.send(doc1.data().username);
    })
    .catch(e => {
        response.send(e);
    })
});

exports.sample = functions.https.onRequest((request, response) => {
    response.send("Hello Sample");
})