import firebase from "../plugins/firestore";
import "firebase/firestore";

export default (store, route, redirect) => {
    let requiresAuth = route.meta.map((meta) => {
        if (meta.auth && typeof meta.auth.authority !== 'undefined')
          return meta.auth.authority
        return 0
      });
    if (requiresAuth) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          redirect()
        } else {
  
          redirect('/signin')
        }
      })
    } else {
      redirect()
    }
  }
  