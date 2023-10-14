<template>
    <NuxtLink :href="`/detail/${item._id}`">
        <div
            class="bg-white px-6 h-64 rounded-lg shadow-sm hover:shadow-md flex flex-col justify-center job-card-container"
        >
            <div class="py-2 text-gray-800 font-semibold">
                {{ formatDataString(item.start_date) }}
            </div>
            <h3
                class="text-base"
                v-if="item.city.trim() && item.country.trim()"
            >
                {{ `${item.city}, ${item.country}` }}
            </h3>
            <h3
                class="text-left font-bold text-2xl text-blue-900 whitespace-pre-wrap"
            >
                {{ item.title }}
            </h3>
            <h3 class="text-left text-base opacity-70" v-if="item.orgnization">
                {{ item.orgnization }}
            </h3>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import { formatDataString } from "../utils/date";
import { JobProps } from "./model";

defineProps<{ item: JobProps }>();
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
