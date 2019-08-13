import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

export default ({store}) => {
  if(!store.state.user.status){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        store.commit("user/onAuthStateChanged", {email:user.email,username:user.displayName,uid:user.uid});
        if(sessionStorage.getItem("shishow_user_email") == null){
          sessionStorage.setItem("shishow_user_email",user.email)
          sessionStorage.setItem("shishow_user_name",user.username)
          sessionStorage.setItem("shishow_user_uid",user.uid)

        }
      }else{
        store.commit("user/onUserLogout");
      }
    });
    }
}
  