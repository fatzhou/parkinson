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

Vue.mixin({
  beforeMount: function () {
    document.getElementById('app').scrollTop = 0;
  },
  mounted: function() {
    if(!window.info.doctorMobile && location.hash.indexOf('Login') == -1) {
      // location.reload();
      router.push('Login');
    }
  }
})

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')

window.onload = function() {
  // router.push('Login');
}


