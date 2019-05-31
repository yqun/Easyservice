import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    address: '', // 常用地址
    id: '', // 用户id
    navIndex: 0, // 点击的导航索引
    orderId: -1, // 工单id
  },
  mutations: {
    Address(state, address) { // 常用地址
      if (address) return state.address = address;
      state.address = '';
    },
    Id(state, id) {
      state.id = id;
    },
    NavIndex(state, navIndex) { // 点击导航的索引
      state.navIndex = navIndex
    },
    OrderId(state, orderId) { // 工单id
      state.orderId = orderId
    }
  }
})


export default store
