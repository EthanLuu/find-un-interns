<template>
  <NuxtLayout>
    <el-main v-loading.fullscreen.lock="loading" class="main w-full h-full max-w-screen-lg p-4" style="height: calc(100vh - 140px)">
      <el-row class="mb-4 gap-2" justify="end">
        <el-button type="success" @click="fillDemo">DEMO</el-button>
        <el-button @click="nextStep">下一步</el-button>
        <el-button v-show="generated" type="warning" @click="reset">重置</el-button>
        <el-button v-show="!generated && activeStep > 2" type="primary" @click="generate">生成</el-button>
      </el-row>

      <el-steps class="my-2" :active="activeStep" finish-status="success" align-center>
        <el-step title="岗位描述" @click="activeStep = 0" />
        <el-step title="你的简历" @click="activeStep = 1" />
        <el-step title="动机信模板" @click="activeStep = 2" />
      </el-steps>

      <div v-if="!generated">
        <el-card v-show="activeStep === 0" class="flex-1 mt-4" title="JD">
          <template #header>
            <el-text class="mb-2">岗位描述</el-text>
          </template>
          <el-input type="textarea" :rows="10" v-model="jobDescription" placeholder="请填写目标岗位描述"></el-input>
        </el-card>

        <el-card v-show="activeStep === 1" class="flex-1 mt-4" title="CV">
          <template #header>
            <el-text class="mb-2">你的简历</el-text>
          </template>
          <el-input type="textarea" :rows="10" v-model="cv" placeholder="请填写你的简历"></el-input>
        </el-card>

        <el-card v-show="activeStep === 2" class="flex-1 mt-4" title="Motivation Letter">
          <template #header>
            <el-text class="mb-2">动机信模板</el-text>
          </template>
          <el-input type="textarea" :rows="10" v-model="template" placeholder="请填写你的动机信模板"></el-input>
        </el-card>
      </div>

      <el-text v-else>
        <el-input autosize type="textarea" v-model="motivationLetter"></el-input>
      </el-text>
    </el-main>
  </NuxtLayout>
</template>
<script setup lang="ts">
  const axios = useAxios()

  const activeStep = ref(0)
  const jobDescription = ref('')
  const cv = ref('')
  const template = ref('')
  const motivationLetter = ref('待生成')
  const loading = ref(false)
  const generated = computed(() => motivationLetter.value !== '待生成')

  const fillDemo = () => {
    jobDescription.value = `The United Nations Office for Project Services (UNOPS) is an operational arm of the United Nations, supporting the successful implementation of its partners' peacebuilding, humanitarian and development projects around the world. Mandated as a central resource of the United Nations, UNOPS provides sustainable project management, procurement and infrastructure services to a wide range of governments, donors and United Nations organizations.`
    cv.value = `I am a student of Nanjing University, majoring in computer science and technology. I have a solid foundation in computer science and technology, and I am proficient in JavaScript, Python, and other programming languages. I have a strong interest in artificial intelligence and have done a lot of research in this field.`
    template.value = `From the moment I embarked on my study in xxx, .....  This post at XXX ....
Years of practice have equipped me with .... 
Moreover, during my internship at xxx, I ....
I sincerely hope I can seize this long-awaited opportunity and support XXXX in its mission to ....
  `
  }

  const generate = async () => {
    loading.value = true
    const res = await axios.value.post('/gpt/motivation', {
      jobDescription: jobDescription.value,
      cv: cv.value,
      template: template.value,
    })
    const { data } = res
    ElMessage.success('生成成功')
    motivationLetter.value = data
    loading.value = false
  }

  const reset = () => {
    jobDescription.value = ''
    cv.value = ''
    template.value = ''
    motivationLetter.value = '待生成'
    activeStep.value = 0
  }

  const nextStep = () => {
    activeStep.value += 1
  }
</script>
