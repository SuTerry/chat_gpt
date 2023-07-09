import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/api',
    name: 'Api',
    component: () => import('@/views/ApiDoc.vue'),
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/Account.vue'),
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      keepAlive: false,
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

// router.beforeEach((to, form, next) => {
//   console.log(to, 'to');
  
//   next()
// })

export default router