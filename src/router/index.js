import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { getToken } from '../helpers/token'
const routes = [
  {
    path: '/',
    redirect: {
      name: "Home"
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (!getToken()) {
        next()
      } else {
        next({
          path: '/home',
        })
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

export default router
