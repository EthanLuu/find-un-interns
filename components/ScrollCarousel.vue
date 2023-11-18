<template>
  <div class="overflow-hidden relative w-full py-2">
    <el-icon v-show="showLeftArrow" size="24" class="icon-button left-0 -translate-y-1/2 translate-x-1/2" @click="handleLeft">
      <ArrowLeftBold />
    </el-icon>
    <el-icon v-show="showRightArrow" size="24" class="icon-button right-0 -translate-y-1/2 -translate-x-1/2" @click="handleRight">
      <ArrowRightBold />
    </el-icon>
    <div class="overflow-hidden relative w-full scroll-container" ref="scorllContainer" @scroll="handleScroll">
      <div class="wrapper overflow-x-scroll inline-flex py-4" ref="wrapper">
        <JobCard v-for="item in carousels" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { JobInfo } from './model'
  import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
  defineProps<{ loading?: boolean; carousels: JobInfo[] }>()
  const scorllContainer = ref<HTMLElement>()
  const itemWidth = 450
  const handleLeft = () => {
    if (!scorllContainer.value) return
    scorllContainer.value.scrollLeft -= itemWidth
  }
  const handleRight = () => {
    if (!scorllContainer.value) return
    scorllContainer.value.scrollLeft += itemWidth
  }

  const showLeftArrow = ref(false)
  const showRightArrow = ref(true)
  const updateArrowVisibility = () => {
    if (!scorllContainer.value) return
    showLeftArrow.value = scorllContainer.value.scrollLeft > 0
    showRightArrow.value = scorllContainer.value.scrollLeft + scorllContainer.value.clientWidth < scorllContainer.value.scrollWidth
  }

  const handleScroll = throttle(() => {
    updateArrowVisibility()
  }, 100)

  onMounted(() => {
    updateArrowVisibility()
  })
</script>

<style scoped>
  .scroll-container {
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;
    scroll-snap-type: mandatory;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .wrapper {
    vertical-align: top;
    display: inline-flex;
    position: relative;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    /* 隐藏滚动条的轨道部分 */
    &::-webkit-scrollbar {
      width: 0;
    }
    /* 隐藏滚动条的滑块部分 */
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
    /* 隐藏滚动条的轨道部分 */
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .icon-button {
    z-index: 999;
    height: 48px;
    width: 48px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    border-radius: 100%;
    top: 50%;
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>
