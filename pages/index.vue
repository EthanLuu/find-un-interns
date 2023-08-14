<template>
    <NuxtLayout>
        <el-main class="w-full">
            <div class="max-w-screen-lg m-auto">
                <div class="flex flex-col wrapper justify-center m-auto gap-4">
                    <el-card>
                        <template #header>
                            <h3 class="text-3xl font-bold font-serif">
                                数据统计
                            </h3>
                        </template>
                        <HomeStatistics :statistics="statistics" />
                    </el-card>

                    <el-card>
                        <template #header>
                            <h3 class="text-3xl font-bold font-serif">
                                最新岗位
                            </h3>
                        </template>
                        <HomeCarousel :carousels="carousels" />
                    </el-card>
                </div>
            </div>
        </el-main>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { data: statistics } = await useFetch("/api/statistics");
const { data: carousels } = await useFetch("/api/carousels");
</script>

<style scoped lang="scss">
.table-wrapper {
    flex: 1;
}
</style>
