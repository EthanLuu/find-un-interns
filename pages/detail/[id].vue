<template>
  <el-main class="w-full">
    <div class="max-w-screen-lg m-auto flex flex-col gap-4">
      <el-card>
        <template #header>
          <el-page-header @back="goBack" title="返回" class="page-header">
            <template #content>
              <h3 class="text-xl font-bold">
                {{ jobInfo?.title }}
              </h3>
            </template>
          </el-page-header>
        </template>
        <el-row class="flex gap-4">
          <el-tag v-for="tag in detailInfo?.tags">
            {{ tag }}
          </el-tag>
        </el-row>

        <el-descriptions class="mt-4" :column="6" border>
          <el-descriptions-item :span="6">
            <template #label>
              <div class="cell-item">岗位名称</div>
            </template>
            {{ jobInfo?.title }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">工作地点</div>
            </template>
            {{ jobInfo?.city }} - {{ jobInfo?.country }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">组织名称</div>
            </template>
            {{ jobInfo?.orgnization }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">创建日期</div>
            </template>
            {{ formatDataString(jobInfo?.start_date) }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">截止日期</div>
            </template>
            {{ formatDataString(jobInfo?.end_date) }}
          </el-descriptions-item>

          <el-descriptions-item :span="6">
            <template #label>
              <div class="cell-item">UNCAREER链接</div>
            </template>
            <el-link :href="jobInfo?.link">
              {{ jobInfo?.link }}
            </el-link>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card>
        <h3 class="text-xl font-bold">岗位介绍</h3>
        <el-collapse v-model="activeItem" class="my-2">
          <el-collapse-item title="GPT总结" name="gpt" class="whitespace-pre-line">
            {{ detailInfo?.summary }}
          </el-collapse-item>
          <el-collapse-item title="原始文本" name="raw" class="whitespace-pre-line">
            {{ detailInfo?.raw }}
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </el-main>
</template>

<script setup lang="ts">
  import type { JobInfo, JobDetailInfo } from '../../components/model'

  const route = useRoute()
  const router = useRouter()
  const { id } = route.params
  const { data: jobInfo } = await useFetch<JobInfo>(`/api/jobs/${id}`)
  const { data: detailInfo } = await useFetch<JobDetailInfo>(`/api/details/${id}`)

  const goBack = () => {
    router.back()
  }

  const activeItem = ref('gpt')
</script>

<style lang="scss" scoped>
  :root {
    --el-collapse-header-font-size: 14px;
    --el-collapse-content-font-size: 14px;
  }

  .page-header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :deep(.el-collapse-item__header) {
    font-weight: 600;
  }
</style>
