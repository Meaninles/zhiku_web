<template>
  <div>
    <div class="gva-table-box">
        <div class="gva-btn-list">
            <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
            <el-popover v-model:visible="deleteVisible" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="deleteVisible = false">取消</el-button>
                <el-button type="primary" @click="onDelete">确定</el-button>
            </div>
            <template #reference>
                <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button>
            </template>
            </el-popover>
        </div>
        <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="对话名称" prop="chatName" width="120" />
        <el-table-column align="left" label="对话类型" prop="chatType" width="120">
            <template #default="scope">
            {{ filterDict(scope.row.chatType,chatTypeOptions) }}
            </template>
        </el-table-column>
        <el-table-column align="left" label="知识库id" prop="kBId" width="120" />
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateMyChatsFunc(scope.row)">变更</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="90px">
        <el-form-item label="用户id:"  prop="userId" >
          <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="对话名称:"  prop="chatName" >
          <el-input v-model="formData.chatName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="知识库id:"  prop="kBId" >
          <el-select v-model="formData.chatType" placeholder="请选择" style="width:100%" :clearable="true" >
            <el-option v-for="(item,key) in kBIdOptions.data" :key="key" :label="item.knowledgeBaseName" :value="item.ID" />
          </el-select>
          <!-- <el-input v-model="formData.kBId" :clearable="true"  placeholder="请输入" /> -->
        </el-form-item>
        <el-form-item label="对话类型:"  prop="chatType" >
          <el-select v-model="formData.chatType" placeholder="请选择" style="width:100%" :clearable="true" >
            <el-option v-for="(item,key) in chatTypeOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
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
  deleteMyChats,
  deleteMyChatsByIds,
  updateMyChats,
  findMyChats,
  getMyChatsList,
  getKBIds
} from '@/api/myChats'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const chatTypeOptions = ref([])
const formData = ref({
        userId: 0,
        chatName: '',
        kBId: '',
        chatType: undefined,
        })

const kBIdOptions = ref([])

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


// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getMyChatsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () =>{
    chatTypeOptions.value = await getDictFunc('chatType')
    console.log(chatTypeOptions)
    console.log('wocao??????')
    kBIdOptions.value = await getKBIds()
    console.log(kBIdOptions)
}

// 获取需要的字典 可能为空 按需保留
setOptions()


// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
            deleteMyChatsFunc(row)
        })
    }


// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
      const res = await deleteMyChatsByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        deleteVisible.value = false
        getTableData()
      }
    }

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateMyChatsFunc = async(row) => {
    const res = await findMyChats({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.remyChats
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteMyChatsFunc = async (row) => {
    const res = await deleteMyChats({ ID: row.ID })
    if (res.code === 0) {
        ElMessage({
                type: 'success',
                message: '删除成功'
            })
            if (tableData.value.length === 1 && page.value > 1) {
            page.value--
        }
        getTableData()
    }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
        userId: 0,
        chatName: '',
        kBId: '',
        chatType: undefined,
        }
}
// 弹窗确定
const enterDialog = async () => {
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
                closeDialog()
                getTableData()
              }
      })
}
</script>

<style>
</style>
