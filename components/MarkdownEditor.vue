<template>
  <el-text v-if="!editable">
    {{ modelValue || '待填写' }}
  </el-text>
  <el-input v-else v-model="inputValue" type="textarea" placeholder="请输入" :autosize="{ minRows: 12 }" />
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })

  const emits = defineEmits(['update:modelValue'])
  const editable = ref(false)

  const inputValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })

  defineExpose({
    editable,
  })
</script>
