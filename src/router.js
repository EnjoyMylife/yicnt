import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ './components/common/Home'),
    children: [{
      path: '/home',
      meta: {
        requireAuth: true,
        title: '宜创办公-首页',
        name: 'home'
      },
      component: () => import(/* webpackChunkName: "home" */ './views/About.vue')
    },
    {
      path: '/page1',
      meta: {
        title: '宜创办公-页面1'
      },
      component: () => import(/* webpackChunkName: "page1" */ './views/testPage/Page1.vue')
    },
    {
      path: '/page2',
      meta: {
        title: '宜创办公-页面2'
      },
      component: () => import(/* webpackChunkName: "page2" */ './views/testPage/Page2.vue')
    },
    {
      path: '/page3',
      meta: {
        title: '宜创办公-页面3'
      },
      component: () => import(/* webpackChunkName: "page3" */ './views/testPage/Page3.vue')
    },
    {
      path: '/page11',
      meta: {
        title: '宜创办公-页面11'
      },
      component: () => import(/* webpackChunkName: "page11" */ './views/testPage/Page11.vue')
    },
    {
      path: '/404',
      meta: {
        title: '404'
      },
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue')
    }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '宜创办公-登陆'
    },
    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
  ]
})
