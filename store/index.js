// holds your root state
export const state = () => ({
    user: null
  })
  
  //Actions
  export const actions = {
    setLoggedUser({ state, commit }){
      commit('setUser', state.loggedUser)
    }
  }

  //Mutations
  export const mutations = {
    setUser(state, user){
      state.user = user
    }
  }

  //Getters
  export const getters = {
      loggedUser(state){ return state.user}
  }