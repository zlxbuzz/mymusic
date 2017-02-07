import Vue from 'vue'

import Vuex from 'vuex'
import * as actions from './actions.js'

const state = {
  song : ''
}

const mutations = {
  changeSong(state,song){
    state.song =  song;
  }
}

const getters = {
  getSong (state){
    return state.song;
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
