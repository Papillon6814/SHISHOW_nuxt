export const state = () => ({
  searchWord: "",
})

export const mutations = {
    onSearchWordInput(state, word) {
      state.searchWord = word
    },
    

}

export const getters = {
  getSearchWord(state) {
    return state.searchWord
  },
}

export const actions = {
  nuxtServerInit({dispatch}){
    dispatch("user/setUser");
  }
}

