<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-09 09:11:28
 * @Description: 操作功能组件
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->

<template>
  <div class="operation-container">
    <button class="upload-btn ui-btn">
      一键上传图片
      <input @change="uploadFiles" type="file" accept="image/*" multiple />
    </button>
    <button class="export-btn ui-btn" @click="handleExport">导出为图片</button>
    <span>{{ widthData }}-{{ heightData }}</span>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import html2canvas from 'html2canvas'

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['upload-complete'])
const { title, date } = toRefs(props)

const widthData = ref(0)
    const heightData = ref(0)
const uploadFiles = (e) => {
  const files = e.target.files;
  const list = []
  if(files.length > 0){
    for(let i = 0; i < files.length; i++){
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;
          const scale = 300 / width
          let moveY = 0
          if(width < height) {
            moveY = (height * scale - 200) / 2
          }
          list.push({
            img: e.target.result,
            width: img.width,
            height: img.height,
            y: -moveY
          });
          if (list.length === files.length) {
            emit('upload-complete', list)
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(files[i]);
    }
  }
  const element = document.querySelector('.travel-container')
  if (!element) {
    throw new Error('找不到要导出的元素')
  }
  
  widthData.value = element.offsetWidth
  heightData.value = element.offsetHeight
}
const extractDate = (str) => {
  const regex = /于(\d{4})年(\d{1,2})月(\d{1,2})日/
  const match = str.match(regex)
  if (match) {
    const [_, year, month, day] = match
    return {
      year,
      month: month.padStart(2, '0'),
      day: day.padStart(2, '0')
    }
  }
  return null
}
const handleExport = async () => {
  try {
    const element = document.querySelector('.travel-container')
    if (!element) {
      throw new Error('找不到要导出的元素')
    }
    const options = {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight
    }
    
    const canvas = await html2canvas(element, options)
    const link = document.createElement('a')
    const dateInfo = extractDate(date.value)
    const imgName = dateInfo ? `${dateInfo.year}${dateInfo.month}${dateInfo.day}_${title.value}` : title.value
    link.download = `${imgName}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('导出图片失败:', error)
    alert('导出图片失败，请重试')
  }
}
</script>
<style scoped>
.operation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: #f9dac3;
}

.ui-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  width: fit-content;
  margin-bottom: 16px;
}

.ui-btn+.ui-btn {
  margin-left: 16px;
}

.upload-btn {
  background: #8f2b03;
  color: #fff;
  position: relative;
}

.upload-btn input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.export-btn {
  background: #4CAF50;
  color: white;
}

.export-btn:hover {
  background: #45a049;
}
</style>
