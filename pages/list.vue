<template>
    <NuxtLayout>
        <el-main class="main w-full" style="padding: 0">
            <JobTable :loading="loading" :jobs="jobs" :finished="finished" @load-more="loadMore" @load-all="loadAll" />
        </el-main>
    </NuxtLayout>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { JobInfo } from '../components/model'
import { useAxios } from '../server/axios'

const { instance: axios } = useAxios()
const jobs = ref<JobInfo[]>([])
const loading = ref(true)
const finished = ref(false)
const route = useRoute()

watch(
    () => route.query,
    () => {
        onSearch((route.query.searchKey as string) || '')
    }
)

const page = ref(1)
const onSearch = async (searchKey: string) => {
    finished.value = false
    loading.value = false
    page.value = 1
    jobs.value = []
    await loadMore(searchKey)
    await loadMore(searchKey)
}
const loadMore = async (searchKey: string) => {
    if (loading.value || finished.value) return
    loading.value = true
    const response = await axios.get('/jobs', {
        params: {
            searchKey,
            page: page.value
        }
    })
    const { data } = response
    jobs.value = [...jobs.value, ...data]
    page.value += 1
    loading.value = false
    finished.value = data.length === 0
}

const loadAll = async () => {
    if (finished.value) return
    loading.value = true
    const searchKey = route.query.searchKey as string
    const response = await axios.get('/jobs', {
        params: {
            all: true,
            searchKey
        }
    })
    const { data } = response
    jobs.value = [...data]
    loading.value = false
    finished.value = true
}

onMounted(() => {
    onSearch((route.query.searchKey as string) || "");
});
</script>

<style scoped lang="scss">
.table-wrapper {
    flex: 1;
}
</style>
