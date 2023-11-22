<template>
  <el-main class="main w-full justify-center items-center" style="display: flex; padding: 0; height: calc(100vh - 140px)">
    <div class="w-full max-w-sm p-6 pb-0 bg-white rounded-md shadow-lg">
      <el-form class="w-full" ref="formRef" :model="registerForm" :rules="registerRules">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repeatedPassword">
          <el-input v-model="registerForm.repeatedPassword" placeholder="请重复密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" type="email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="flex-1" type="primary" @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
  import { useUserStore } from '~/store/user'
  const router = useRouter()

  const formRef = ref()
  const registerForm = ref({
    username: '',
    password: '',
    email: '',
    repeatedPassword: '',
  })

  const validateRepeatedPassword = (rule: any, value: any, callback: any) => {
    if (value !== registerForm.value.password) {
      callback(new Error('两次输入的密码不一致'))
    } else {
      callback()
    }
  }

  const registerRules = ref({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
    ],
    repeatedPassword: [
      { required: true, message: '请重复密码', trigger: 'blur' },
      { validator: validateRepeatedPassword, trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
    ],
  })

  const userStore = useUserStore()
  const onRegister = async () => {
    const valid = formRef.value?.validate()
    if (!valid) {
      ElMessage.warning('请检查注册表单项是否正确填写')
      return
    }
    const res = await userStore.register(registerForm.value)
    if (res.resultCode === 'success') {
      ElMessage.success('注册成功')
      router.push('/')
    } else {
      ElMessage.error(res.message)
    }
  }
</script>
