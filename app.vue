<template>
    <el-container class="container" style="height: 100vh">
        <el-header class="header">
            <h1 class="title">联合国实习岗位汇总</h1>
            <el-input
                v-model="searchValue"
                class="search-bar"
                placeholder="请输入标题或城市"
                autofocus="true"
                @input="onInput"
                @change="onSearch"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><Search /></el-icon>
                </template>
            </el-input>
        </el-header>
        <el-main class="main">
            <MainTable
                :isLoading="isLoading"
                :jobs="jobs"
                @load-more="loadMore"
            />
        </el-main>
    </el-container>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { JobProps } from "components/model";

const config = useRuntimeConfig();
const baseUrl = config.public.BASE_URL;

const jobs = ref<JobProps[]>([]);
const isLoading = ref(true);

const searchValue = ref("");

let page = ref(1);

const onSearch = async () => {
    page.value = 1;
    isLoading.value = false;
    jobs.value = [];
    loadMore();
};

const loadMore = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    const response = await fetch(
        `${baseUrl}/jobs?searchKey=${searchValue.value}&page=${page.value}`
    );
    const { data } = await response.json();
    jobs.value = [...jobs.value, ...data];
    page.value += 1;
    isLoading.value = false;
};

let inputTimer: NodeJS.Timeout;
const onInput = () => {
    clearTimeout(inputTimer);
    inputTimer = setTimeout(() => {
        if (isLoading.value) return;
        onSearch();
    }, 1000);
};

onMounted(() => {
    onSearch();
});
</script>

<style scoped lang="scss">
body {
    margin: 0;
    min-height: 100vh;
}

.header {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 调整阴影效果的颜色和大小 */
    z-index: 2;
    gap: 24px;
    white-space: nowrap;

    .title {
        color: #076585;
        margin: 0;
        display: block;
    }
    .search-bar {
        max-width: 300px;
    }
}

.main {
    display: flex;
    padding: 0;
}

.table-wrapper {
    flex: 1;
}
</style>
