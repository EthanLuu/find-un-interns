<template>
    <el-header class="header bg-white">
        <NuxtLink to="/" class="h-full flex justify-center items-center blue">
            <el-icon size="20" style="margin: 0"><Opportunity /></el-icon>
            <h1 class="text-xl">UNiQ</h1>
        </NuxtLink>
        <el-menu
            :default-active="route.path"
            mode="horizontal"
            :ellipsis="false"
            style="border-bottom: 0"
            class="h-full"
        >
            <el-menu-item index="/" style="padding: 0">
                <NuxtLink class="w-full px-8 flex items-center" to="/">
                    <span> 首页 </span>
                </NuxtLink>
            </el-menu-item>
            <el-menu-item index="/list" style="padding: 0">
                <NuxtLink class="w-full px-8 flex items-center" to="/list">
                    <span> 职位 </span>
                </NuxtLink>
            </el-menu-item>
        </el-menu>
        <div class="flex-1"></div>
        <GlobalSearch />
    </el-header>
</template>

<script setup lang="ts">
import { Opportunity } from "@element-plus/icons-vue";
const route = useRoute();
</script>

<style scoped lang="scss">
.blue {
    color: #409eff;
}
.header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 调整阴影效果的颜色和大小 */
    z-index: 2;
    gap: 24px;
    white-space: nowrap;
}
</style>
