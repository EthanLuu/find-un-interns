<template>
    <div class="text-center overflow-hidden rounded-lg">
        <el-carousel height="250px">
            <el-carousel-item
                v-for="item in carousels"
                :key="item.title"
                v-loading="loading"
                class="py-12 px-12"
            >
                <h3
                    class="text-center text-xl"
                    v-if="item.city.trim() && item.country.trim()"
                >
                    {{ `${item.city}, ${item.country}` }}
                </h3>
                <h3 class="text-center font-bold text-2xl py-2 text-gray-800">
                    {{ item.title }}
                </h3>
                <h3
                    class="text-center text-xl opacity-90"
                    v-if="item.orgnization"
                >
                    {{ item.orgnization }}
                </h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang="ts">
import { JobProps } from "./model";
defineProps<{ loading?: boolean; carousels: JobProps[] }>();
</script>

<style scoped lang="scss">
.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #475669;
    &:nth-child(2n) {
        background-color: rgba(185, 212, 250, 0.5);
    }
    &:nth-child(2n + 1) {
        background-color: rgba(195, 202, 255, 0.5);
    }
}
</style>
