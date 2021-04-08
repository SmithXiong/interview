import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import poem from './modules/poem'
import dynasty from './modules/dynasty'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    poem,
    dynasty,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters,
})
