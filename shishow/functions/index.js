/* eslint-disable eqeqeq */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// firestoreへの参照
const db = admin.firestore();

exports.home = functions.https.onRequest((request, response) => {
    let users = [];
    let filteredUser = [];
    let relation = [];
    let content = {a: "a"};

    let sign_user = request.query.email;

    db.collection("USER")
    .doc(sign_user)
    .collection("relation")
    .get()
    .then(doc1 => {
        doc1.forEach(doc2 => {
            if(doc2.data().email != sign_user) {
                users.push(doc2.data());
                filteredUser.push(doc2.data());

                if(doc1.docs) {
                    let i;
                    for(i = 0; i < doc1.docs.length && doc.data().email != doc1.docs[i].id; i++) {
                        if(i == doc1.docs.length) {
                            relation.push(0);
                        }
                        else {
                            relation.push(doc1.docs[i].data().relation);
                        }
                    }
                }
                else {
                    relation.push(0);
                }
            }
        })
        content.users = users;
        content.filteredUser = filteredUser;
        content.relation = relation;

        response.json(content);
    })
    .catch(e => {
        response.send(e);
    })
});

exports.sample = functions.https.onRequest((request, response) => {
    response.send("Hello Sample");
});