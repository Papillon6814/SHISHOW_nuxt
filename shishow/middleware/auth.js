import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

export default ({store}) => {
  if(!store.state.user.status){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
      store.commit("user/onAuthStateChanged", {email:user.email,username:user.displayName,uid:user.uid});

      }else{
        store.commit("user/onUserLogout");
      }
    });
    }
}
  