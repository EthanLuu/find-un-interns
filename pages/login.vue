<template>
  <NuxtLayout>
    <el-main class="main w-full justify-center items-center" style="display: flex; padding: 0; height: calc(100vh - 140px)">
      <div class="w-full max-w-sm p-6 pb-0 bg-white rounded-md shadow-lg">
        <el-form ref="formRef" class="w-full" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="flex-1" type="primary" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  import { useUserStore } from '~/store/user'

  const formRef = ref()
  const router = useRouter()
  const loginForm = ref({
    username: '',
    password: '',
  })
  const loginRules = ref({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })

  const userStore = useUserStore()
  const onLogin = async () => {
    const valid = await formRef.value.validate()
    if (!valid) {
      return
    }
    const res = await userStore.login(loginForm.value)
    if (res.resultCode === 'success') {
      router.push('/')
    } else {
      ElMessage.error(res.message)
    }
  }
</script>
