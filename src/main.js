import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.mixin({
<<<<<<< HEAD
  mounted: function () {
=======
  beforeMount: function () {
>>>>>>> 478299a61fa3aa7504db620b933e77a109f933c3
    window.scrollTo(0,0);
  }
})

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')

window.$router = router;
