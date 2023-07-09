import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/Home/index.vue'),
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, form, next) => {
  console.log(to, 'to');
  
  next()
})

export default router