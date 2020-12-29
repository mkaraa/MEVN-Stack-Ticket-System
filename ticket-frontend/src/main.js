import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
});

function isLoggedIn() {

  // TODO: jwt dogru mu ve exprire mi değil mi check et ona gore return

  var isLogged = true;
  
  if(localStorage.getItem('token') == "") {
    isLogged = false
  }

  return isLogged
}

router.beforeEach((to, from, next) => {

  if (to.path !== '/login' && !isLoggedIn()) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn()) {
    next('/home');
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
