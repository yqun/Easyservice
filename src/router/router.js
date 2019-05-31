import Vue from 'vue'
import Router from 'vue-router'

import homeRouter from '@/router/homeRouter'
import myorderRouter from '@/router/myorderRouter'
import assignedorderRouter from '@/router/assignedorderRouter'
import performorderRouter from '@/router/performorderRouter'
import personalRouter from '@/router/personalRouter'
import keepAliveRouter from '@/router/keepAliveRouter'

import Login from '@/views/home/login'  // 登录

Vue.use(Router)

const router = new Router ({
  routes: [
    {path: '/login', name:'login', component: Login},
    ...homeRouter,
    ...myorderRouter,
    ...personalRouter,
    ...performorderRouter,
    ...assignedorderRouter,
    ...keepAliveRouter,
  ]
})

// 在跳转之前会触发拦截
router.beforeEach((to, from, next) => {
  router.path = from.path
  if (to.path === '/login') return next();
  const token = window.localStorage.getItem('token')
  if (!token) return router.push('/login')
  next()
})

export default router
