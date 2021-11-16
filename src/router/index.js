import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: ()=>import('@/views/Home')
  },
  {
    path: '/login',
    component: ()=>import('@/views/Login')
  },
  {
    path: '/profile',
    component: ()=>import('@/views/Profile')
  },
  {
    path: '/city/:cityid',
    component: ()=>import('@/views/City')
  },
  {
    path: '/index',
    component: ()=>import('@/views/Index'),
    meta: {keepAlive: true}
  },
  {
    path: '/search/:geohash',
    component: ()=>import('@/views/Search')
  },
  //商店详情页
  {
    path: '/shop',
    component: ()=>import('@/views/shop/Shop')
  },
  {
    path: '/food',
    component: ()=>import('@/views/Food')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
