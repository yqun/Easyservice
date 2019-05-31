export default {
  namespaced: true,
  state: {
    stateIndex: 0
  },
  mutations: {
    StateIndex (state, index) {
      state.stateIndex = index
    }
  }
}
