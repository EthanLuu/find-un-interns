<template>
    <NuxtLayout>
        <el-main class="w-full">
            <div class="flex flex-col justify-center items-center">
                <div
                    class="max-w-screen-lg flex flex-col justify-center w-full gap-4"
                >
                    <h3 class="text-3xl font-bold">数据统计</h3>
                    <HomeStatistics :statistics="statistics" />
                </div>

                <div
                    class="w-full flex flex-col gap-4 justify-center items-center mt-8"
                >
                    <div class="max-w-screen-lg w-full">
                        <h3 class="text-3xl font-bold">最新岗位</h3>
                        <ScrollCarousel :carousels="latest" />
                    </div>
                </div>

                <div
                    class="w-full flex flex-col gap-4 justify-center items-center"
                >
                    <div class="max-w-screen-lg w-full">
                        <h3 class="text-3xl font-bold">New York</h3>
                        <ScrollCarousel :carousels="newyork" />
                    </div>
                </div>
            </div>
        </el-main>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { data: statistics } = await useFetch("/api/statistics");
const { data: latest } = await useFetch("/api/latest");
const { data: newyork } = await useFetch("/api/newyork");
console.log(newyork);
</script>

<style scoped lang="scss"></style>
