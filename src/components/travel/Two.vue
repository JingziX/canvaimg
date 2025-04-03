<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-03 09:36:33
 * @Description: 文件描述
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->
<template>
  <div class="operation-container">
    <button class="upload-btn ui-btn">
      一键上传图片
      <input @change="uploadFiles" type="file" accept="image/*" multiple />
    </button>
    <button class="export-btn ui-btn" @click="exportToImage">导出为图片</button>
    <span>{{widthData}}-{{heightData}}</span>
  </div>
  <div class="travel-container">
    <div class="travel-title">
      <h1>{{title}}</h1>
      <h3>于{{date}}摄于绍兴</h3>
    </div>
    <div class="travel-content">
      <div class="travel-item" v-for="(item, index) in list" :key="item.id">
        <div class="image-container">
          <img
            :src="item.img"
            alt="上传图片"
            @error="handleImageError($event)"
            :style="{ transform: `rotate(${item.rotation}deg) scale(${item.scale}) translate(${item.x}px, ${item.y}px)` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import defaultImg from '@/assets/images/default.svg'
const initList = new Array(6).fill({img:'',rotation:0,scale:1,x:0,y:0,width:0,height:0})
export default {
  name: 'App',
  setup() {
    const list = ref(initList)
    const title = ref('鲁迅故里一日游')
    const date = ref('2024年9月14日')
    const widthData = ref(0)
    const heightData = ref(0)

    const handleImageError = (event) => {
      event.target.src = defaultImg
    }
    const uploadFiles = (e) => {
      const files = e.target.files;
      if(files.length > 0){
        for(let i = 0; i < files.length && i < list.value.length; i++){
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
              list.value[i] = {
                ...list.value[i],
                img: e.target.result,
                width: img.width,
                height: img.height,
                y: -moveY
              };
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
    const uploadFileItem = (e,index) => {
      const file = e.target.files[0]
      if(file){
        const reader = new FileReader()
        reader.onload = (e) => {
          list.value[index].img = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }
    const exportToImage = async () => {
      try {
        // 获取要导出的容器元素
        const element = document.querySelector('.travel-container')
        widthData.value = element.offsetWidth
        heightData.value = element.offsetHeight
        // 配置选项
        const options = {
          scale: 2, // 提高导出图片的清晰度
          useCORS: true, // 允许跨域图片
          backgroundColor: '#ffffff', // 设置白色背景
          logging: false, // 关闭日志
          width: element.offsetWidth,
          height: element.offsetHeight
        }

        // 等待所有图片加载完成
        await Promise.all(
          list.value
            .filter(item => item.img)
            .map(item => {
              return new Promise((resolve) => {
                const img = new Image()
                img.onload = resolve
                img.src = item.img
              })
            })
        )

        // 生成canvas
        const canvas = await html2canvas(element, options)

        // 转换为图片并下载
        const link = document.createElement('a')
        link.download = `${title.value}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      } catch (error) {
        console.error('导出图片失败:', error)
        alert('导出图片失败，请重试')
      }
    }

    return {
      list,
      title,
      date,
      widthData,
      heightData,
      uploadFiles,
      uploadFileItem,
      exportToImage,
      handleImageError,
    }
  }
}
</script>
<style scoped>
.travel-container{
    background: #fff;
    padding: 0;
    width: 1400px;
    margin: 0 auto;
		position: relative;
}
.travel-content{
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
    padding: 0;
    margin: 0 auto;
		height: 980px;
}
.travel-item{
  	width: 445px;
    height: 280px;
    overflow: hidden;
    position: relative;
}
.travel-item img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.travel-item input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.travel-title{
    width: 100%;
    color: #000;
    text-align: center;
    font-family: 'hellofont';
    padding: 25px 10px;
		position: absolute;
		top: 300px;
		left: 0;
}
.travel-title h1{
  font-size: 50px;
  font-weight: bold;
}
.travel-title h3{
  font-size: 24px;
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
.operation-container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
	background: #f9dac3;
}
.ui-btn{
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  width: fit-content;
  margin-bottom: 16px;
}
.ui-btn+.ui-btn{
  margin-left: 16px;
}
.upload-btn{
  background: #8f2b03;
  color: #fff;
  position: relative;
}
.upload-btn input{
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
