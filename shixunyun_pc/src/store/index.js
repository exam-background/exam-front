import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerContent: ['学生基础信息', '班级管理'],
    idCollapseState: false,
    BarContent: [],
    // 班级信息数据
    ban: [],
    zhuan: [],
    token:''
  },
  mutations: {
    set_token(state, token) {
    state.token = token
    localStorage.setItem("userToken",token)
    },
    del_token(state) {
    state.token = ''
    localStorage.removeItem('userToken')
    },
    topQieM (state) {
      state.idCollapseState = !state.idCollapseState
    },
    updateHeaCon (state, val) {
      // console.log(val)
      state.headerContent = val
    },
    selBanFun (state, classData) {
      state.ban = classData
    },
    selZhuanFun (state, zhuanData) {
      state.zhuan = zhuanData
    }
  },
  actions: {
    async getBan ({ commit }) {
      const result = await axios.get(this.$locations.getAllClassNoPage)
      commit('selBanFun', result.data.data)
    },
    async getZhuan ({ commit }) {
      const result = await axios.get(this.$locations.getProfessionalNoPage)
      commit('selZhuanFun', result.data.data)
    }
  },
  modules: {
  }
})
