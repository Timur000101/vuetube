import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import Authorization from '../views/Authorization.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: Authorization
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  publicPath: process.env.BASE_URL,
})

export default router
