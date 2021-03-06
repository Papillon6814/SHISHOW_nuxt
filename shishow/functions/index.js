/* eslint-disable no-eq-null */
/* eslint-disable promise/no-nesting */
/* eslint-disable eqeqeq */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app = express();

admin.initializeApp(functions.config().firebase);

// firestoreへの参照
const db = admin.firestore();

app.use((_request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/homeData', (request, response) => {
    let users = [];
    let relation = [];
    let content = new Object();
    let i;

    let sign_user = request.query.email;

    let rel = db.collection('USER')
                .doc(sign_user)
                .collection("relation")

    if(rel != null) {
        db.collection("USER")
        .doc(sign_user)
        .collection("relation")
        .get()
        .then(doc1 => {
            db.collection("USER")
            .get()
            .then(doc2 => {
                doc2.forEach(doc3 => {
                    if(doc3.data().email != sign_user) {
                        users.push(doc3.data());

                        if(doc1.docs) {
                            for(i = 0; i < doc1.docs.length && doc3.data().email != doc1.docs[i].id; i++);
                            if(i == doc1.docs.length) {
                                relation.push(0)
                            }
                            else {
                                relation.push(doc1.docs[i].data().relation);
                            }
                            
                        }
                        else {
                            relation.push(0)
                        }
                    }
                })
                content.users = users;
                content.filteredUser = users;
                content.relation = relation;

                response.json(content);
            })
        })
        .catch(e => {
            response.send(e);
        })
    }
    else {
        db.collection("USER")
            .doc(sign_user)
            .relation("relation")
            .get()
            .then(doc1 => {
                db.collection("USER")
                    .get()
                    .then(doc2=> {
                        if(sign_user != doc2.id) {
                            users.push(doc2.data());
                            filteredUser.push(doc2.data());
                            relation.push(0);
                        }
                    })
            })
    }

})
/*
app.get('/chatData/isGame', (request, response) => {

    let friendDocID = request.query.friendDocID;

    db.collection("GameCollection")
        .doc(friendDocID)
        .collection("GlobalChat")
        .orderBy('date')
})
*/



const api = functions.https.onRequest(app);
module.exports = { api };
