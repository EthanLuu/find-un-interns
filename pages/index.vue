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
                        <HomeStatistics
                            :loading="loadingStatistics"
                            :statistics="statistics"
                        />
                    </el-card>

                    <el-card>
                        <template #header>
                            <h3 class="text-3xl font-bold font-serif">
                                最新岗位
                            </h3>
                        </template>
                        <HomeCarousel
                            :loading="loadingCarousels"
                            :carousels="carousels"
                        />
                    </el-card>
                </div>
            </div>
        </el-main>
    </NuxtLayout>
</template>

<script setup lang="ts">
const statistics = ref<any>({});
const loadingStatistics = ref(true);

const loadStatistics = async () => {
    const data = await $fetch("/api/statistics");
    statistics.value = data;
    loadingStatistics.value = false;
};

const carousels = ref<any>([]);
const loadingCarousels = ref(true);

const loadCarousels = async () => {
    const data = await $fetch("/api/carousels");
    carousels.value = data;
    loadingCarousels.value = false;
};

onMounted(() => {
    loadStatistics();
    loadCarousels();
});
</script>

<style scoped lang="scss">
.table-wrapper {
    flex: 1;
}
</style>
