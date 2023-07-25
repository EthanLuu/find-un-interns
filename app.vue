<template>
    <NuxtPage />
</template>

<script setup lang="ts">
import { useAxios } from "./server/axios";
const config = useRuntimeConfig();
const baseUrl = config.public.BASE_URL as string;
const { init: initAxios } = useAxios();
initAxios(baseUrl);
</script>

<style scoped lang="scss"></style>
