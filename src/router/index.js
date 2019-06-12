import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Receiver from '@/components/Receiver'
import Preload from '@/components/Preload'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'preload',
      component: Preload
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/receiver',
      name: 'receiver',
      component: Receiver
    },
  ]
})
