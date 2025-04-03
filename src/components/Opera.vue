<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-01 20:35:49
 * @Description: 文件描述
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->
<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="upload-container">
      一键上传图片
      <input type="file" accept="image/*" multiple />
    </div>
</template>

<style scoped>

.upload-container{
    width: fit-content;
    padding: 10px 16px;
    text-align: center;
    background: #1af702;
    position: relative;
}
.upload-container input{
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
