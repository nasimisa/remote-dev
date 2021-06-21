import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/saved-jobs',
    name: 'SavedJobs',
    // route level code-splitting
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SavedJobs.vue')
  },
  {
    path: '/applied-jobs',
    name: 'AppliedJobs',   
    component: () => import('../views/AppliedJobs.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
