// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import NavBar from '@/components/NavBar'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueTuicalendar from '@lkmadushan/vue-tuicalendar'
import 'tui-calendar/dist/tui-calendar.min.css'
import VueDateFns from "vue-date-fns";
Vue.use(VueDateFns);
Vue.prototype.$http = Axios;
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(Datetime)
Vue.use(VueTuicalendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, NavBar },
  template: '<App/>'
})
