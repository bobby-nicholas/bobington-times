import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import News from '@/components/News'
import Development from '@/components/Development'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'News',
      component: News
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Dev',
      name: 'Development',
      component: Development
    }
  ]
})
