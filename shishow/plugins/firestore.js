import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD2D42pBXU_nXpo2wTd_IFs-4hogXE8Dq0",
  authDomain: "shishow-7cc37.firebaseapp.com",
    databaseURL: "https://shishow-7cc37.firebaseio.com/",
    projectId: "shishow-7cc37",
    storageBucket: "shishow-7cc37.appspot.com",
    messagingSenderId: "476890822571",
    appId: "1:476890822571:web:508b49508a91c0d3"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase
