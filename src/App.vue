<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-09 22:01:58
 * @Description: 文件描述
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->
<script>
export default {
  name: 'App'
}
</script>

<template>
  <a href="/">6图下</a>
  <a href="/travel/two">6图中</a>
  <a href="/travel/three">9图</a>
  <a href="/travel/four">4图|</a>
  <a href="/travel/five">3图</a>
  <a href="/travel/six">4图—</a>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  margin-right: 10px;
}
</style>
