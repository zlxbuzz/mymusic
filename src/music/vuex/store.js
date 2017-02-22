import Vue from 'vue'
import Promise from 'promise-polyfill';
// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

import Vuex from 'vuex'
import * as actions from './actions.js'

const state = {
  song : {
    src:'',
    id:''
  },
  songList:[],
  music:''
}

const mutations = {
  currentMusic(state,music){
    state.music = music;
  },
  setSongList(state,list){
    state.songList = list;
  },
  changeSong(state,song){
    state.song.src =  song.src;
    state.song.id =  song.id;
  },
}

const getters = {
  getSong (state){
    return state.song;
  },
  getSongList (state){
    return state.songList;
  },
  getMusic (state){
    return state.music;
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
