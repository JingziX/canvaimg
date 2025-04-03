/*
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-03 09:16:14
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-03 09:19:30
 * @Description: 路由配置
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
import TravelOne from '@/components/travel/One.vue'
import TravelTwo from '@/components/travel/Two.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TravelOne
  },
  {
    path: '/travel',
    name: 'travel',
    component: TravelTwo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router