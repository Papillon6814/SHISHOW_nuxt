import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

export default ({store}) => {
  firebase.auth().onAuthStateChanged(user => {
    if(user){
     store.commit("user/onAuthStateChanged", user.email,user.displayName,user.uid);
     store.commit("user/onUserStatusChanged_t");
    }else{
      store.commit("user/onUserStatusChanged_f");
    }
   });
  }
  