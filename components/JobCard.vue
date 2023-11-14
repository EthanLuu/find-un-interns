<template>
    <NuxtLink class="bg-white px-6 h-64 rounded-lg shadow-sm hover:shadow-md job-card-container"
        :href="`/detail/${item._id}`">
        <div class="h-full flex justify-center flex-col overflow-hidden text-ellipsis">
            <div class="flex items-center">
                <el-icon>
                    <Calendar />
                </el-icon>
                <span class="text-gray-800 font-semibold ml-1">
                    {{ formatDataString(item.start_date) }}
                </span>
            </div>
            <div class="flex items-center">
                <el-icon>
                    <LocationInformation />
                </el-icon>
                <h3 class="text-base ml-1" v-if="item.city.trim() && item.country.trim()">
                    {{ `${item.city}, ${item.country}` }}
                </h3>
            </div>
            <h3 style="max-height: 130px"
                class="max-row-2 text-left font-bold text-2xl my-2 text-blue-500 whitespace-pre-wrap overflow-clip">
                {{ item.title }}
            </h3>
            <h3 class="text-left text-base opacity-70 whitespace-pre-wrap" v-if="item.orgnization">
                {{ item.orgnization }}
            </h3>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import { LocationInformation, Calendar } from '@element-plus/icons-vue'
import { formatDataString } from '../utils/date'
import { JobInfo } from './model'

defineProps<{ item: JobInfo }>()
</script>

<style scoped>
.job-card-container {
    scroll-snap-coordinate: left;
    scroll-snap-align: start;
    width: 100%;
    width: 450px;
    margin-right: 24px;

    /* &:nth-child(2n) {
        background-color: rgb(220, 234, 255);
    }
    &:nth-child(2n + 1) {
        background-color: rgb(225, 229, 255);
    } */

    transition: all 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
    }
}
</style>
