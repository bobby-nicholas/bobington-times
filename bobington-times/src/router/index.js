import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import Development from '@/components/Development'
import Recording from '@/components/Recording'
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
    },
    {
      path: '/Recording',
      name: 'Recording',
      component: Recording
    }
  ]
})
