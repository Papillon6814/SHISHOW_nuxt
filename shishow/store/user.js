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
      
      onAuthStateChanged(state, user) {
        state.user = user;
        state.status = true;
        // firebaseが返したユーザー情報
      },
  
      

      onUserLogout(state) {
        state.user = {}
        state.status = false;
        // ログインしているかどうか
      },
  
      onOpeningChatArea(state, userData) {
        state.id_list = {};
        state.user_name_list = {};
  
        state.id_list = userData.id_list;
        state.user_name_list = userData.user_name_list;
      },
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