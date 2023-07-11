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
            <el-auto-resizer>
                <template #default="{ height, width }">
                    <el-table
                        v-loading="isLoading"
                        :data="jobs"
                        :height="height"
                        :width="width"
                        stripe
                    >
                        <el-table-column prop="title" label="标题">
                            <template #default="scope">
                                <el-link :href="scope.row.link">
                                    {{ scope.row.title }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="country"
                            label="国家"
                            width="130"
                            :filters="countryFilters"
                            :filter-method="filterCountry"
                        />
                        <el-table-column
                            prop="city"
                            label="城市"
                            width="130"
                            :filters="cityFilters"
                            :filter-method="filterCity"
                        />
                        <el-table-column prop="orgnization" label="组织" />
                        <el-table-column
                            prop="start_date"
                            label="发布日期"
                            width="130"
                            sortable
                        >
                            <template #default="scope">
                                <div>
                                    {{
                                        dayjs(scope.row.start_date).format(
                                            "YYYY-MM-DD"
                                        )
                                    }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="end_date"
                            label="截止日期"
                            width="130"
                            sortable
                        >
                            <template #default="scope">
                                <div>
                                    {{
                                        dayjs(scope.row.end_date).format(
                                            "YYYY-MM-DD"
                                        )
                                    }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-auto-resizer>
        </el-main>
    </el-container>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import dayjs from "dayjs";

interface JobProps {
    title: string;
    country: string;
    city: string;
    link: string;
}

const jobs = ref<JobProps[]>([]);
const isLoading = ref(true);
const apiUrl = "https://un-api.ethanloo.cn/jobs";
const searchValue = ref("");

const loadAll = async () => {
    isLoading.value = true;
    const response = await fetch(apiUrl);
    const data = await response.json();
    jobs.value = data;
    isLoading.value = false;
};

onMounted(() => {
    loadAll();
});

const onSearch = async () => {
    isLoading.value = true;
    const response = await fetch(`${apiUrl}?searchKey=${searchValue.value}`);
    const data = await response.json();
    jobs.value = data;
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
const countryFilters = computed(() => {
    const countries = jobs.value.map((job) => job.country);
    return Array.from(new Set(countries)).map((country) => ({
        text: country,
        value: country
    }));
});
const filterCountry = (filter: string, row: JobProps) => {
    return row.country === filter;
};

const cityFilters = computed(() => {
    const cities = jobs.value.map((job) => job.city);
    return Array.from(new Set(cities)).map((city) => ({
        text: city,
        value: city
    }));
});
const filterCity = (filter: string, row: JobProps) => {
    return row.city === filter;
};
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
:deep(.nowrap) {
    white-space: nowrap;
}
.main {
    flex: 1;
}
</style>
