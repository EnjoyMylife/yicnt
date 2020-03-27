import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import qs from 'qs'

import ElementUI from 'element-ui'
import './plugins/element.js'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/styles/global.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(contentmenu)

router.beforeEach((to, form, next) => {
  let userInfo = localStorage['userInfo']
  // let tabsList = localStorage['tabsList']
  if (userInfo || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

// Vue.mixin({
//   beforeRouteLeave: (to, from, next) => {
//     console.log(to)
//     next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
