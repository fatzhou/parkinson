import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes_social'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.mixin({
  beforeMount: function () {
    window.scrollTo(0,0);
  }
})

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')

// window.$router = router;
// window.$info = {
//   doctorMobile: '',
//   patientMobile: '',
//   familyMobile: ''
// };
