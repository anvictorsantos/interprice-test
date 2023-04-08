import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap CSS e JS imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Fontawesome CSS e JS imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
