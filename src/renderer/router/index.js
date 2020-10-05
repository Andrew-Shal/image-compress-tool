import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home.vue"

Vue.use(VueRouter)


const routes = [
  {
      path:"/",
      name:"Home",
      component:Home
  },
  {
      path:"/about",
      name:"About",
      component: () => import("../views/About.vue"),
  },
  {
      path:"/preference",
      name:"Preference",
      component: () => import ("../views/Preference.vue"),
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

export default router