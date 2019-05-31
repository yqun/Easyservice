export default {
  namespaced: true,
  state: {
    address: '',
  },
  mutations: {
    Address(state, address) {
      if (address) return state.address = address;
      state.address = '';
    }
  }
}
