// Composables
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next({name: 'admin.index'});
          } else {
            next();
          }
        },
        component: () => import('@/views/auth/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next({name: 'login'});
      }
    },
    children: [
      {
        path: '',
        name: 'admin.index',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/admin/Index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
export default router
