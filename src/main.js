import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap CSS e JS imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
