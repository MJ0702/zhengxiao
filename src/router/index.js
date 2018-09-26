import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import intro from '@/components/intro'
import product from '@/components/product'
import about from '@/components/about'
import detail from '@/components/detail'
import error from '@/components/error'
Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/zhengxiao/',
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
      path:'/home/detail',
      name:'detail',
      component:detail
    },
    {
      //重定向
      path: '/',
      redirect: '/home',
    },
    {
      path:'*',
      component:error,
      name:'error',
      meta:{
        title:'页面没找到'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
