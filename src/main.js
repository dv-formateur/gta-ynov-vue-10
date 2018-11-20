// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import NavBar from '@/components/NavBar'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'


Vue.prototype.$http = Axios;
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);
Vue.use(Datetime)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, NavBar },
  template: '<App/>'
})
