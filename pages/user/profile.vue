<template>
  <el-main class="w-full max-w-screen-lg">
    <el-card title="我的简历">
      <template #header>
        <el-row justify="space-between">
          <h2 class="text-xl">我的简历</h2>
          <div v-if="isEditing">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="handleEdit">编辑</el-button>
          </div>
        </el-row>
      </template>

      <MarkdownEditor v-model="personInfo" ref="editorRef" />
    </el-card>
  </el-main>
</template>

<script setup lang="ts">
  const editorRef = ref()
  const savedPersonInfo = ref('')
  const axios = useAxios()
  const { data: personInfo } = await axios.value.get('/user/personinfo')
  const isEditing = ref(false)

  watch(isEditing, () => {
    if (editorRef.value) {
      editorRef.value.editable = isEditing.value
    }
  })

  const handleEdit = () => {
    savedPersonInfo.value = personInfo.value || ''
    isEditing.value = true
  }

  const handleSave = () => {
    isEditing.value = false
  }

  const handleCancel = () => {
    isEditing.value = false
    personInfo.value = savedPersonInfo.value
  }
</script>
