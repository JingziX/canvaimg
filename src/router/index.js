/*
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-03 09:16:14
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-06 22:37:57
 * @Description: 路由配置
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
import TravelOne from '@/pages/travel/One.vue'
import TravelTwo from '@/pages/travel/Two.vue'
import TravelThree from '@/pages/travel/Three.vue'
import TravelFour from '@/pages/travel/Four.vue'
import TravelFive from '@/pages/travel/Five.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: TravelOne
  },
  {
    path: '/travel/two',
    name: 'travelTwo',
    component: TravelTwo
  },
  {
    path: '/travel/three',
    name: 'travelThree',
    component: TravelThree
  },
  {
    path: '/travel/four',
    name: 'travelFour',
    component: TravelFour
  },
  {
    path: '/travel/five',
    name: 'travelFive',
    component: TravelFive
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router