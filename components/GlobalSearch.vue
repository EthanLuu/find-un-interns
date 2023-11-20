<template>
  <el-input
    v-model="searchValue"
    class="search-bar"
    placeholder="请输入关键词"
    autofocus
    clearable
    :prefix-icon="Search"
    @keydown="onEnter"
  ></el-input>
</template>

<script lang="ts" setup>
  import { Search } from '@element-plus/icons-vue'
  const searchValue = ref('')
  const router = useRouter()
  const onEnter = (event: KeyboardEvent | Event) => {
    if ((event as KeyboardEvent).key === 'Enter') {
      onSearch()
    }
  }

  const onSearch = () => {
    router.push({
      path: '/list',
      query: {
        searchKey: searchValue.value,
      },
    })
  }
</script>

<style scoped>
  .search-bar {
    max-width: 300px;
  }
</style>
