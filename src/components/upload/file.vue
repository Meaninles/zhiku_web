<template>
  <div>
    <el-upload
      :action="`${path}/fileUploadAndDownload/uploadWithDescription`"
      :data="uploadData"
      :before-upload="checkFile"
      :headers="{ 'x-token': userStore.token }"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :show-file-list="false"
      class="upload-btn"
    >
      <el-button type="primary">文件上传</el-button>
    </el-upload>
    <el-form-item label="文件内容描述:" prop="fileDescription">
      <el-input v-model="fileDescription" :clearable="true" placeholder="请先输入文件描述，再上传文件" />
    </el-form-item>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'
import { useRoute } from 'vue-router'

const emit = defineEmits(['on-success'])
const path = ref(import.meta.env.VITE_BASE_API)

const userStore = useUserStore()
const fullscreenLoading = ref(false)

const fileDescription = ref('')
const kbId = ref(useRoute().params.id)
const uploadData = ref({
  fileDescription,
  kbId,
})

const checkFile = (file) => {
  console.log('fileDescription: ' + uploadData.value.fileDescription + ', kbId: ' + uploadData.value.kbId)
  console.log(file.type)
  fullscreenLoading.value = true
  const isTXT = file.type === 'text/plain'
  // const isLt2M = file.size / 1024 / 1024 < 0.5
  if (!isTXT) {
    ElMessage.error('暂时只支持 txt 纯文本格式，后续将逐渐加入更多格式')
    fullscreenLoading.value = false
  }
  return (isTXT)
}

const uploadSuccess = (res) => {
  const { data } = res
  if (data.file) {
    emit('on-success', data.file.url)
  }
}

const uploadError = () => {
  ElMessage({
    type: 'error',
    message: '上传失败'
  })
  fullscreenLoading.value = false
}

</script>

<script>

export default {
  name: 'UploadCommon',
  methods: {

  }
}
</script>
