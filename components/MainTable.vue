<template>
    <el-auto-resizer @scroll="onScroll">
        <template #default="{ height, width }">
            <el-table
                v-loading="isLoading"
                :data="jobs"
                :height="height"
                :width="width"
                ref="tableRef"
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
                                dayjs(scope.row.start_date).format("YYYY-MM-DD")
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
                            {{ dayjs(scope.row.end_date).format("YYYY-MM-DD") }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </el-auto-resizer>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { JobProps } from "./model";

const props = defineProps<{ jobs: JobProps[]; isLoading: boolean }>();
const emit = defineEmits(["load-more"]);

const countryFilters = computed(() => {
    const countries = props.jobs.map((job) => job.country);
    return Array.from(new Set(countries)).map((country) => ({
        text: country,
        value: country
    }));
});
const filterCountry = (filter: string, row: JobProps) => {
    return row.country === filter;
};

const cityFilters = computed(() => {
    const cities = props.jobs.map((job) => job.city);
    return Array.from(new Set(cities)).map((city) => ({
        text: city,
        value: city
    }));
});
const filterCity = (filter: string, row: JobProps) => {
    return row.city === filter;
};

const tableRef = ref<any>(null);

const load = () => {
    if (props.isLoading) return;
    emit("load-more");
    console.log("load-more");
};

// throttle
let lastLoad = performance.now();
let scrollTimer: number;
const timeout = 1000;
const onScroll = (event: Event) => {
    if (scrollTimer) return;
    scrollTimer = requestAnimationFrame(() => {
        const now = performance.now();
        if (now - lastLoad >= timeout) {
            const { target } = event;
            if (!target) return;
            const element = target as HTMLElement;
            const { clientHeight, scrollTop, scrollHeight } = element;
            const diff = 800;
            if (clientHeight + scrollTop + diff >= scrollHeight) {
                load();
            }
            lastLoad = now;
        }
        scrollTimer = 0;
    });
};

onMounted(() => {
    const scorllBarRef = tableRef.value.scrollBarRef;
    const wrap = scorllBarRef.wrapRef;
    wrap.addEventListener("scroll", onScroll);
});
</script>
