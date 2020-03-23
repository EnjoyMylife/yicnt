import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import base from './modules/base'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    base
  },
  getters
})
