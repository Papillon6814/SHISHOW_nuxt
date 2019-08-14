import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAtWLW-jbfj5fDf8MnpUf691Ha2uOuugmQ",
  authDomain: "shishow-product.firebaseapp.com",
  databaseURL: "https://shishow-product.firebaseio.com",
  projectId: "shishow-product",
  storageBucket: "",
  messagingSenderId: "445065927151",
  appId: "1:445065927151:web:7f8bb88704787289"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase
