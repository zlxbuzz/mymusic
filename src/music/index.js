import Vue from 'vue'
import App from './App.vue'
import './assets/index.less'
import store from './vuex/store.js'

window.onload = function () {
  new Vue({
    el: 'app',
    store,
    components: {App}
  })
}
