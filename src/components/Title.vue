<!--
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2025-04-06 22:38:28
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2025-04-07 22:41:42
 * @Description: 标题组件
 * Copyright (c) 2025 by ${git_name}, All Rights Reserved.
-->

<template>
  
  <div class="travel-title">
			<div class="travel-title-container" :style="titleStyle" @mousemove="titleInput = true" @mouseleave="titleInput = false">
				<span class="travel-title">{{ title }}</span>
				<input v-show="titleInput" type="text" @click.stop v-model="title" placeholder="请输入标题" @input="handleTitleInput">
			</div>
			<div class="travel-second-title-container" :style="dateStyle" @mousemove="dateInput = true" @mouseleave="dateInput = false">	
				<span class="travel-second-title">{{ date }}</span>
				<input v-show="dateInput" type="text" @click.stop v-model="date" placeholder="请输入日期等" @input="handleDateInput">
			</div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'
defineProps({
    titleStyle: {
        type: Object,
        default: () => ({}),
        required: false
    },
    dateStyle: {
        type: Object,
        default: () => ({}),
        required: false
    }
})
const title = ref('某某几日游')
const date = ref('于2025年1月1日摄于某某')
const titleInput = ref(false)
const dateInput = ref(false)
const emit = defineEmits(['update:title', 'update:date'])
const handleTitleInput = () => {
  emit('update:title', title.value)
}
const handleDateInput = () => {
  emit('update:date', date.value)
}
</script>
<style scoped>
.travel-title {
  font-family: 'hellofont';
  padding: 10px 70px;
}
.travel-title input{
  font-family: 'hellofont';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
.travel-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: bold;
  position: relative;
}
.travel-second-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  position: relative;
}
.travel-title-container input{
  font-size: 60px;
}
.travel-second-title-container input{
  font-size: 30px;
}

</style>
