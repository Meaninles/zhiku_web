<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户id:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="对话名称:" prop="chatName">
          <el-input v-model="formData.chatName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="知识库id:" prop="kBId">
          <el-input v-model="formData.kBId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="对话类型:" prop="chatType">
          <el-select v-model="formData.chatType" placeholder="请选择" :clearable="true">
            <el-option v-for="(item,key) in chatTypeOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyChats'
}
</script>

<script setup>
import {
  createMyChats,
  updateMyChats,
  findMyChats
} from '@/api/myChats'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const chatTypeOptions = ref([])
const formData = ref({
            userId: 0,
            chatName: '',
            kBId: '',
            chatType: undefined,
        })
// 验证规则
const rule = reactive({
               userId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               chatName : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               kBId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               chatType : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findMyChats({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.remyChats
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
    chatTypeOptions.value = await getDictFunc('chatType')
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createMyChats(formData.value)
               break
             case 'update':
               res = await updateMyChats(formData.value)
               break
             default:
               res = await createMyChats(formData.value)
               break
           }
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
             })
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
