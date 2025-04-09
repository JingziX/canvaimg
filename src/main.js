/*
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-09 09:22:33
 * @Description: 文件描述
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
 */
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { imageError } from './directives/imageError'


const app = createApp(App)
app.use(router)
app.directive('image-error', imageError)
app.mount('#app')
