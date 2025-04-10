<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-01 20:11:58
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-10 09:18:53
 * @Description: 操作功能组件
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->

<template>
  <div class="image-controls">
    <button class="upload-btn">
      上传图片<input
        @change="uploadFileItem($event)"
        type="file"
        accept="image/*"
      />
    </button>
    <button class="zoom-in" @click="zoomIn">放大10%</button>
    <button class="zoom-out" @click="zoomOut">缩小10%</button>
    <button class="move-up" @click="moveUp">上移10px</button>
    <button class="move-down" @click="moveDown">下移10px</button>
    <button class="move-left" @click="moveLeft">左移10px</button>
    <button class="move-right" @click="moveRight">右移10px</button>
    <button class="rotate-left" @click="rotateLeft">左转10度</button>
    <button class="rotate-right" @click="rotateRight">右转10度</button>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:item'])

const { item } = toRefs(props)

const updateItem = (updates) => {
  emit('update:item', { ...item.value, ...updates, index: props.index })
}

const uploadFileItem = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      updateItem({ img: e.target.result })
    }
    reader.readAsDataURL(file)
  }
}

const moveLeft = () => updateItem({ x: item.value.x - 10 })
const moveRight = () => updateItem({ x: item.value.x + 10 })
const moveUp = () => updateItem({ y: item.value.y - 10 })
const moveDown = () => updateItem({ y: item.value.y + 10 })
const zoomIn = () => updateItem({ scale: item.value.scale * 1.1 })
const zoomOut = () => updateItem({ scale: item.value.scale / 1.1 })
const rotateLeft = () => updateItem({ rotation: item.value.rotation - 10 })
const rotateRight = () => updateItem({ rotation: item.value.rotation + 10 })
</script>

<style scoped>
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

.image-controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-controls {
  opacity: 1;
}

.image-controls button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.image-controls button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
