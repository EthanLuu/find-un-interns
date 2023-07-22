<template>
    <el-container direction="vertical" style="height: 100vh">
        <PageHeader />
        <el-main class="main">
            <JobTable
                :loading="loading"
                :jobs="jobs"
                :finished="finished"
                @load-more="loadMore"
                @load-all="loadAll"
            />
        </el-main>
    </el-container>
</template>

<script setup lang="tsx">
import { ref } from "vue";
import { JobProps } from "../components/model";
import { useAxios } from "../utils/api";

const { instance: axios } = useAxios();
const jobs = ref<JobProps[]>([]);
const loading = ref(true);
const finished = ref(false);
const route = useRoute();

watch(
    () => route.query,
    () => {
        onSearch((route.query.searchKey as string) || "");
    }
);

const page = ref(1);
const onSearch = async (searchKey: string) => {
    page.value = 1;
    loading.value = false;
    jobs.value = [];
    await loadMore(searchKey);
    await loadMore(searchKey);
};
const loadMore = async (searchKey: string) => {
    if (loading.value || finished.value) return;
    loading.value = true;
    const response = await axios.get("/jobs", {
        params: {
            searchKey,
            page: page.value
        }
    });
    const { data } = response;
    jobs.value = [...jobs.value, ...data];
    page.value += 1;
    loading.value = false;
    finished.value = data.length === 0;
};

const loadAll = async () => {
    if (finished.value) return;
    loading.value = true;
    const searchKey = route.query.searchKey as string;
    const response = await axios.get("/jobs", {
        params: {
            all: true,
            searchKey
        }
    });
    const { data } = response;
    jobs.value = [...data];
    loading.value = false;
    finished.value = true;
};

onMounted(() => {
    onSearch("");
});
</script>

<style scoped lang="scss">
.main {
    display: flex;
    padding: 0;
}

.table-wrapper {
    flex: 1;
}
</style>
