<template>
  <el-auto-resizer @scroll.stop="onScroll" style="height: 100%">
    <template #default="{ height, width }">
      <el-table v-loading="loading" :data="jobs" :height="height" :width="width" :border="true" ref="tableRef" stripe>
        <el-table-column prop="title" label="标题" resizable min-width="300" max-width="800" :show-overflow-tooltip="true">
          <template #default="scope">
            <NuxtLink class="whitespace-nowrap text-blue-500 hover:underline font-semibold" :href="`/detail/${scope.row._id}`">
              {{ scope.row.title }}
            </NuxtLink>
          </template>
        </el-table-column>
        <el-table-column
          prop="country"
          label="国家"
          width="120"
          :filters="countryFilters"
          :filter-method="filterCountry"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="city"
          label="城市"
          width="100"
          :filters="cityFilters"
          :filter-method="filterCity"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="orgnization" label="组织" :show-overflow-tooltip="true" />
        <el-table-column prop="start_date" label="发布日期" width="130" sortable>
          <template #default="scope">
            {{ scope.row.end_date ? dayjs(scope.row.start_date).format('YYYY-MM-DD') : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="end_date" label="截止日期" width="130" sortable>
          <template #default="scope">
            {{ scope.row.end_date ? dayjs(scope.row.end_date).format('YYYY-MM-DD') : '-' }}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-auto-resizer>
  <el-button
    :class="{ visible: showTopButton }"
    circle
    size="large"
    :icon="Top"
    type="primary"
    class="transition-opacity fixed bottom-20 right-8 z-10 overflow-hidden opacity-0"
    @click="scrollToTop"
  ></el-button>
  <el-button
    circle
    size="large"
    :icon="Bottom"
    type="primary"
    class="fixed bottom-8 right-8 z-10 overflow-hidden"
    @click="scrollToBottom"
  ></el-button>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { Bottom, Top } from '@element-plus/icons-vue'
  import type { JobInfo } from './model'

  const props = defineProps<{
    jobs: JobInfo[]
    loading?: boolean
    finished: boolean
  }>()
  const emit = defineEmits(['load-more', 'load-all'])
  const showTopButton = ref(false)

  const countryFilters = computed(() => {
    const countries = props.jobs.map((job) => job.country)
    return Array.from(new Set(countries))
      .map((country) => ({
        text: country,
        value: country,
      }))
      .sort((x, y) => (x.text > y.text ? 1 : -1))
  })
  const filterCountry = (filter: string, row: JobInfo) => {
    return row.country === filter
  }

  const cityFilters = computed(() => {
    const cities = props.jobs.map((job) => job.city)
    return Array.from(new Set(cities))
      .map((city) => ({
        text: city,
        value: city,
      }))
      .sort((x, y) => (x.text > y.text ? 1 : -1))
  })
  const filterCity = (filter: string, row: JobInfo) => {
    return row.city === filter
  }

  const tableRef = ref<any>(null)

  const loadMore = () => {
    if (props.loading) return
    emit('load-more')
  }

  // throttle
  let lastLoad = performance.now()
  let scrollTimer: number
  const diff = 1200 // when to start loading
  const timeout = 300
  const onScroll = (event: Event) => {
    const { target } = event
    if (!target) return
    const element = target as HTMLElement
    const { clientHeight, scrollTop, scrollHeight } = element
    showTopButton.value = scrollTop > 2
    if (scrollTimer) return
    scrollTimer = requestAnimationFrame(() => {
      const now = performance.now()
      if (now - lastLoad >= timeout) {
        if (clientHeight + scrollTop + diff >= scrollHeight || scrollHeight === clientHeight) {
          loadMore()
        }
        lastLoad = now
      }
      scrollTimer = 0
    })
  }

  const scrollToTop = () => {
    tableRef.value.setScrollTop(0)
  }

  const scrollToBottom = () => {
    const { tableBody } = tableRef.value.$refs
    if (props.finished) {
      tableRef.value.setScrollTop(tableBody.clientHeight)
    }
    emit('load-all')
    watch(
      () => props.loading,
      () => {
        if (props.loading) return
        requestAnimationFrame(() => {
          tableRef.value.setScrollTop(tableBody.clientHeight)
        })
      }
    )
  }

  const tableScrollWrapper = ref(null)

  onMounted(() => {
    const scorllBarRef = tableRef.value.scrollBarRef
    const wrap = scorllBarRef.wrapRef
    wrap.addEventListener('scroll', onScroll)
    tableScrollWrapper.value = wrap
  })
</script>

<style lang="scss" scoped>
  .visible {
    opacity: 1;
  }
</style>
