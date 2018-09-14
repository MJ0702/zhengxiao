import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import intro from '@/components/intro'
import product from '@/components/product'
import about from '@/components/about'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/intro',
      name: 'intro',
      component: intro
    },
    {
      path: '/product',
      name: 'product',
      component: product
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      //重定向
      path: '/',
      redirect: '/home',
    },
  ]
})
