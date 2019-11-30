import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/account',
    name: 'account',
    meta: {layout: 'main'},
    component: () => import('../views/Account.vue')
  },
  {
    path: '/',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../views/Authorization.vue')
  }, 
  {
    path: '/videoDetail/:id',
    name: 'videoDetail',
    meta: {layout: 'main'},
    component: () => import('../views/VideoDetail.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  publicPath: process.env.BASE_URL,
})

export default router
