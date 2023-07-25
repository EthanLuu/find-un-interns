<template>
    <NuxtLayout>
        <el-main
            >2
            <el-row>1</el-row>
            {{ route.params.id }}
        </el-main>
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
const jobInfo = ref({});

const loadJobInfo = async () => {
    const data = await $fetch(`/api/job/${id}`);
};
</script>
