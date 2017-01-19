import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes_doctor'
import VueResource from 'vue-resource'

window.info = {
  doctorMobile: '',
  token: ''
}

Vue.use(VueResource)
Vue.use(VueRouter)
// Vue.http.headers.common['Authorization'] = window.info.token;

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')

window.onload = function() {
  // router.push('Admin');
}


