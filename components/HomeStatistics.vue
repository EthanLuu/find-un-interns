<template>
    <el-row justify="center" align="middle" v-loading="loading || false" :gutter="12">
        <el-col class="flex justify-center" :span="12" :sm="6">
            <el-card shadow="hover">
                <el-statistic title="正在招聘中" :value="statistics.availableJobs" />
            </el-card>
        </el-col>
        <el-col class="flex justify-center" :span="12" :sm="6">
            <el-card shadow="hover">
                <el-statistic title="昨日新增" :value="statistics.yesterJobs" />
            </el-card>
        </el-col>
        <el-col class="flex justify-center flex-col mt-3 md:mt-0" :span="12" :sm="6">
            <el-tooltip :content="hotOrgName" placement="top">
                <el-card shadow="hover">
                    <el-statistic :value="statistics.hotOrganization?.count">
                        <template #title>
                            <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                                <span>热门组织</span>
                                <span class="text-blue-600 font-bold ml-1">
                                    {{ hotOrgName }}
                                </span>
                            </div>
                        </template>
                    </el-statistic>
                </el-card>
            </el-tooltip>
        </el-col>
        <el-col class="flex justify-center flex-col mt-3 md:mt-0" :span="12" :sm="6">
            <el-tooltip :content="hotJobName" placement="top">
                <el-card shadow="hover">
                    <el-statistic :value="statistics.hotJob?.count">
                        <template #title>
                            <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                                <span>热门岗位</span>
                                <span class="text-blue-600 font-bold ml-1">
                                    {{ hotJobName }}
                                </span>
                            </div>
                        </template>
                    </el-statistic>
                </el-card>
            </el-tooltip>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { vLoading } from "element-plus";
type StatisticProp = {
    availableJobs: number;
    yesterJobs: number;
    hotOrganization: { name: string; count: number };
    hotJob: { name: string; count: number };
};

const props = defineProps<{ statistics: StatisticProp; loading?: boolean }>();
const hotOrgName = computed(() => {
    if (!props.statistics.hotOrganization) return "";
    return props.statistics.hotOrganization?.name.replace(/\(.*?\)/g, "");
});
const hotJobName = computed(() => {
    if (!props.statistics.hotJob) return "";
    return props.statistics.hotJob?.name.replace(/\[.*?\]/g, "");
});
</script>
