<template>
    <NuxtLayout>
        <el-main class="w-full">
            <div class="max-w-screen-lg m-auto flex flex-col gap-4">
                <el-card>
                    <template #header>
                        <el-page-header
                            @back="goBack"
                            title="返回"
                            class="page-header"
                        >
                            <template #content>
                                <h3 class="text-xl font-bold">
                                    {{ jobInfo.title }}
                                </h3>
                            </template>
                        </el-page-header>
                    </template>
                    <el-row class="flex gap-4">
                        <NuxtLink
                            v-for="tag in detailInfo.tags"
                            :to="`/list?searchKey=${tag}`"
                        >
                            <el-tag>
                                {{ tag }}
                            </el-tag>
                        </NuxtLink>
                    </el-row>
                </el-card>
                <el-card>
                    <template #header>
                        <div class="flex justify-between">
                            <span> 岗位介绍 </span>
                            <ElButton type="text" @click="toggleJobDesc">
                                {{ showRaw ? "切换GPT总结" : "切换原始" }}
                            </ElButton>
                        </div>
                    </template>
                    <ElText class="whitespace-pre-line" size="large">
                        {{ showRaw ? detailInfo.raw : detailInfo.summary }}
                    </ElText>
                </el-card>
            </div>
        </el-main>
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { id } = route.params;
const { data: detailInfo } = await useFetch(`/api/details/${id}`);
const { data: jobInfo } = await useFetch(`/api/jobs/${id}`);

const goBack = () => {
    router.back();
};

const showRaw = ref(false);
const toggleJobDesc = () => (showRaw.value = !showRaw.value);
</script>

<style lang="scss" scoped>
.page-header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
