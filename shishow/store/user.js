import firebase from "~/plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

export const state = () => ({
    user: {},
    status: false,
    id_list: {},
    user_name_list: {}
  })
  
  export const mutations = {
      
      onAuthStateChanged(state, email,name,uid) {
        state.user = {email:email,displayName:name,uid:uid};
        // firebaseが返したユーザー情報
      },
  
      onUserStatusChanged_t(state) {
        state.status = true;
        // ログインしているかどうか
      },

      onUserStatusChanged_f(state) {
        state.status = false;
        // ログインしているかどうか
      },
  
      onOpeningChatArea(state, userData) {
        state.id_list = {};
        state.user_name_list = {};
  
        state.id_list = userData.id_list;
        state.user_name_list = userData.user_name_list;
      },

      aaa(state,user){
        state.user = user
      }
  }
  
  export const actions = {
    openChatArea({
        commit
      }, id_list, user_name_list) {
        let userData = {
          "id_list": id_list,
          "user_name_list": user_name_list
        };
        commit('onOpeningChatArea', userData)
      },

      setUser({commit}){
        firebase.auth().onAuthStateChanged(user => {
           commit("aaa",user);
      })
    }
    
  }
  
  export const getters = {

    user(state) {
      return state.user;
    },
  
    isSignedIn(state) {
      return state.status;
    },
  
    idList(state) {
      return state.id_list;
    },
  
    userNameList(state) {
      return state.user_name_list;
    }
  }