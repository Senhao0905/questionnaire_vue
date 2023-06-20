import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FrontEnd',
      component: () => import("../views/FrontEnd.vue")
    },
    {
      path: '/backEnd',
      name: 'BackEnd',
      component: () => import("../views/BackEnd.vue")
    }
  ]
})

export default router
