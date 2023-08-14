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
                    
                    <el-tabs v-model="activeTabName">
                        <el-tab-pane label="GPT" name="summary">
                            {{ detailInfo.summary }}
                        </el-tab-pane>
                        <el-tab-pane label="原始" name="raw">
                            {{ detailInfo.raw }}
                        </el-tab-pane>
                    </el-tabs>
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

const activeTabName = ref("summary");
</script>

<style lang="scss" scoped>
.page-header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
