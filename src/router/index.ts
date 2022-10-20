import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServerStats from '@/views/ServerStats.vue'
import FingerPrint from '@/views/FingerPrint.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path : '/connected-servers',
      name : 'ConnectedServers',
      component : ServerStats
    },
    {
      path : '/finger-print',
      name : 'FingerPrint',
      component : FingerPrint
    }
  ]
})

export default router
