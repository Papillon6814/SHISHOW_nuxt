import { Store } from "vuex";

export const state = () => ({
  searchWord: "",
  init:true,
})

export const mutations = {
    onSearchWordInput(state, word) {
      state.searchWord = word
    },
    
    changeInit(state){
      state.init = false;
    },
}

export const getters = {
  getSearchWord(state) {
    return state.searchWord
  },
}

export const actions = {
  nuxtClientInit({commit,state}){
    
    const email = sessionStorage.getItem("shishow_user_email")
    if(email){
      const name = sessionStorage.getItem("shishow_user_name")
      const uid = sessionStorage.getItem("shishow_user_uid")
      commit("user/onAuthStateChanged",{email:email,username:name,uid:uid});
      state.init = false;
    }else{
      commit("user/onUserLogout");
    }
  }
}

