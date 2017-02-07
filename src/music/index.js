import Vue from 'vue'
import App from './App.vue'
import './assets/index.less'
import store from './vuex/store.js'

require("../../node_modules/ionicons/dist/css/ionicons.min.css");

window.onload = function () {
  new Vue({
    el: 'app',
    store,
    components: {App}
  })
}
