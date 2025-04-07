<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-07 23:24:26
 * @Description: 三张图片
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->
<template>
  <Opera :widthData="widthData" :heightData="heightData" :title="imgTitle" :date="imgDate" @upload-complete="handleUploadComplete" />
  <div class="travel-container">
    <div class="travel-content">
      <div class="travel-item" v-for="(item, index) in list">
        <div class="image-container">
          <img :src="item.img" alt="上传图片" @error="handleImageError($event)"
            :style="{ transform: `rotate(${item.rotation}deg) scale(${item.scale}) translate(${item.x}px, ${item.y}px)` }" />

          <OperaImg :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import defaultImg from '@/assets/images/default.svg'
import Title from '@/components/Title.vue'
import Opera from '@/components/Opera.vue'
import OperaImg from '@/components/OperaImg.vue'
const initList = new Array(9).fill({ img: '', rotation: 0, scale: 1, x: 0, y: 0, width: 0, height: 0 })
export default {
  name: 'App',
  components: {
    Title,
    Opera,
    OperaImg
  },
  setup() {
    const list = ref(initList)
    const imgTitle = ref('')
    const imgDate = ref('')
    const widthData = ref(0)
    const heightData = ref(0)

    const handleImageError = (event) => {
      event.target.src = defaultImg
    }
    const handleUploadComplete = (uploadedList) => {
      // 更新 list 数组
      list.value = list.value.map((item, index) => {
        if (index < uploadedList.length) {
          return {
            ...item,
            ...uploadedList[index]
          }
        }
        return item
      })
    }
    return {
      list,
      imgTitle,
      imgDate,
      widthData,
      heightData,
      handleImageError,
      handleUploadComplete
    }
  }
}
</script>
<style scoped>
.travel-container {
  background: #fff;
  padding: 0;
  width: 1400px;
  margin: 0 auto;
  position: relative;
}

.travel-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin: 0 auto;
}

.travel-item {
  width: 445px;
  height: 280px;
  margin: 8px;
  overflow: hidden;
  position: relative;
}

.travel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.travel-item input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
}

.image-container img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
  cursor: move;
  user-select: none;
}
</style>
