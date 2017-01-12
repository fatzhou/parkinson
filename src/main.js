import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

window.info = {
  doctorMobile: '',
  patientMobile: '',
  familyMobile: '',
  geneTest: true
};

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')

Vue.mixin({
  beforeMount: function () {
    document.getElementById('app').scrollTop = 0
  },
  mounted: function() {
    if(!window.info.doctorMobile && location.hash.indexOf('Login') == -1 && location.hash.indexOf('Protocol') == -1) {
      // location.reload();
      router.push('Login');
    }
  }
})

window.onload = function() {
  router.push('Login');
}


