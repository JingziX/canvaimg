/*
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-03 09:16:14
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-09 09:27:04
 * @Description: 路由配置
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
import TravelOne from '@/pages/travel/One.vue'
import TravelTwo from '@/pages/travel/Two.vue'
import TravelThree from '@/pages/travel/Three.vue'
import TravelFour from '@/pages/travel/Four.vue'
import TravelFive from '@/pages/travel/Five.vue'
import TravelSix from '@/pages/travel/Six.vue'
const routes = [
  {
    path: '/',
    title: '6图下',
    name: 'home',
    component: TravelOne
  },
  {
    path: '/travel/two',
    title: '6图中',
    name: 'travelTwo',
    component: TravelTwo
  },
  {
    path: '/travel/three',
    title: '9图',
    name: 'travelThree',
    component: TravelThree
  },
  {
    path: '/travel/four',
    title: '4图|',
    name: 'travelFour',
    component: TravelFour
  },
  {
    path: '/travel/five',
    title: '3图',
    name: 'travelFive',
    component: TravelFive
  },
  {
    path: '/travel/six',
    title: '4图—',
    name: 'travelSix',
    component: TravelSix
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router