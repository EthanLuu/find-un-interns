<template>
  <el-dropdown>
    <el-avatar :src="avatar"></el-avatar>
    <template #dropdown>
      <div class="p-3 flex flex-col gap-3">
        <div class="flex justify-center items-center gap-2">
          <el-avatar :src="avatar"></el-avatar>
          <span class="text-base">{{ userStore.username }}</span>
        </div>
        <el-dropdown-item>1</el-dropdown-item>
      </div>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import { useUserStore } from '~/store/user'

  const userStore = useUserStore()
  const defaultAvatar = 'https://cdn.ethanloo.cn/img/202311201256583.png'
  const avatar = computed(() => userStore.avatar || defaultAvatar)
</script>
