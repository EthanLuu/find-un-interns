<template>
  <el-dropdown v-bind="$attrs">
    <el-avatar :src="userAvatar"></el-avatar>
    <template #dropdown>
      <div class="p-3 flex flex-col gap-3">
        <div class="flex justify-center items-center gap-2">
          <span class="text-base font-semibold">{{ userStore.username }}</span>
        </div>
        <el-dropdown-item>
          <NuxtLink to="/user/profile">我的简历</NuxtLink>
        </el-dropdown-item>
        <el-dropdown-item @click="dialogVisible = true">退出登录</el-dropdown-item>
      </div>
    </template>
  </el-dropdown>

  <el-dialog v-model="dialogVisible" title="提示" width="30%">
    <span>确认退出登录吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleLogout">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useUserStore } from '~/store/user'

  const userStore = useUserStore()
  const defaultAvatar = 'https://cdn.ethanloo.cn/img/202311201256583.png'
  const userAvatar = ref(defaultAvatar || userStore.avatar)

  const dialogVisible = ref(false)

  const handleLogout = () => {
    userStore.logout()
    dialogVisible.value = false
  }
</script>

<style lang="scss" scoped>
  :deep(.el-dropdown-menu__item) {
    justify-content: center;
  }
</style>
