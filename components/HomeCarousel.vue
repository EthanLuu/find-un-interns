<template>
  <div class="text-center rounded-lg w-full">
    <el-carousel type="card" class="py-2">
      <el-carousel-item v-for="item in carousels" :key="item.title" v-loading="loading" class="px-12 rounded-lg shadow-md">
        <div class="py-2 text-gray-800 font-semibold">
          {{ getDateString(item) }}
        </div>
        <h3 class="text-xl" v-if="item.city.trim() && item.country.trim()">
          {{ `${item.city}, ${item.country}` }}
        </h3>
        <h3 class="text-left font-bold text-2xl text-gray-900">
          {{ item.title }}
        </h3>
        <h3 class="text-left text-xl opacity-90" v-if="item.orgnization">
          {{ item.orgnization }}
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
  import type { JobInfo } from './model'
  defineProps<{ loading?: boolean; carousels: JobInfo[] }>()
  const getDateString = (item: JobInfo) => {
    const date = new Date(item.start_date)
    return date.toLocaleDateString()
  }
</script>

<style scoped lang="scss">
  .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: #475669;
    &:nth-child(2n) {
      background-color: rgb(220, 234, 255);
    }
    &:nth-child(2n + 1) {
      background-color: rgb(225, 229, 255);
    }
  }
</style>
