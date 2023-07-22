<template>
    <el-container direction="vertical">
        <PageHeader />
        <el-main class="flex justify-center items-center">
            <div
                class="flex flex-col wrapper max-w-screen-lg justify-center m-auto"
            >
                <div class="py-4">
                    <div class="text-3xl mb-6 font-bold font-serif">
                        数据统计
                    </div>
                    <HomeStatistics
                        :loading="loadingStatistics"
                        :statistics="statistics"
                    />
                </div>

                <div class="py-4">
                    <div class="text-3xl mb-6 font-bold font-serif">
                        最新岗位
                    </div>
                    <HomeCarousel
                        :loading="loadingCarousels"
                        :carousels="carousels"
                    />
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { useAxios } from "../utils/api";
const { instance: axios } = useAxios();
const statistics = ref<any>({});
const loadingStatistics = ref(true);

const loadStatistics = async () => {
    const response = await axios.get("/statistics");
    const { data } = response;
    statistics.value = data;
    loadingStatistics.value = false;
};

const carousels = ref<any[]>([]);
const loadingCarousels = ref(true);

const loadCarousels = async () => {
    const response = await axios.get("/carousels");
    const { data } = response;
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
