<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog">文件上传</el-button>
        <el-form ref="searchForm" :inline="true" :model="search">
          <el-form-item label="">
            <el-input v-model="search.keyword" class="keyword" placeholder="请输入文件名或备注" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData">
        <el-table-column align="left" label="文件名/备注" prop="name" width="180">
          <template #default="scope">
            <div class="name" @click="editFileNameFunc(scope.row)">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="已索引" prop="indexed" width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.indexed === 1 ? 'success' : 'error'"
              disable-transitions
            >{{ scope.row.indexed === 1 ? 'YES' : 'NO' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- TODO 更改描述 -->
        <el-table-column align="left" label="描述" prop="description" min-width="300" />
        <el-table-column align="left" label="链接" prop="url" min-width="300" />
        <el-table-column align="left" label="格式" prop="tag" width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === 'jpg' ? 'primary' : 'success'"
              disable-transitions
            >{{ scope.row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" width="160">
          <template #default="scope">
            <!-- TODO 更改 -->
            <el-button icon="download" type="primary" link @click="downloadFile(scope.row)">下载</el-button>
            <el-button icon="delete" type="primary" link @click="deleteFileFunc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :style="{ float: 'right', padding: '20px' }"
          :total="total"
          :kbId="kbId.value"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <el-dialog v-model="uploadDialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="120px">
        <upload-common
          v-model:fileCommon="fileCommon"
          class="upload-btn"
          @on-success="getTableData"
        />
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { getFileList, deleteFile, editFileName } from '@/api/fileUploadAndDownload'
import { downloadImage } from '@/utils/downloadImg'
import UploadCommon from '@/components/upload/file.vue'

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'

const kbId = ref(useRoute().params.id)
const path = ref(import.meta.env.VITE_BASE_API)

// 弹窗控制标记
const uploadDialogFormVisible = ref(false)

const type = ref('')
const formData = ref({
  fileDescription: '',
})

// 打开弹窗
const openDialog = () => {
  type.value = 'upload'
  uploadDialogFormVisible.value = true
  console.log('kbid is: ' + typeof kbId.value + '   ' + kbId.value)
}

// 关闭弹窗
const closeDialog = () => {
  console.log(formData.value.fileDescription)
  uploadDialogFormVisible.value = false
  formData.value = {
    fileDescription: '',
  }
}

const fileCommon = ref('')

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const search = ref({})
const tableData = ref([])

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getFileList({ page: page.value, pageSize: pageSize.value, kbId: kbId.value, ...search.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
  console.log(table)
  closeDialog()
}
getTableData()

const deleteFileFunc = async(row) => {
  ElMessageBox.confirm('此操作将永久删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await deleteFile(row)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功!',
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

const downloadFile = (row) => {
  if (row.url.indexOf('http://') > -1 || row.url.indexOf('https://') > -1) {
    downloadImage(row.url, row.name)
  } else {
    debugger
    downloadImage(path.value + '/' + row.url, row.name)
  }
}

/**
 * 编辑文件名或者备注
 * @param row
 * @returns {Promise<void>}
 */
const editFileNameFunc = async(row) => {
  ElMessageBox.prompt('请输入文件名或者备注', '编辑', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空',
    inputValue: row.name
  }).then(async({ value }) => {
    row.name = value
    // console.log(row)
    const res = await editFileName(row)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '编辑成功!',
      })
      getTableData()
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消修改'
    })
  })
}
</script>

<script>

export default {
  name: 'UserKnowledgeBaseDetail',
}
</script>
<style scoped>
.name {
  cursor: pointer;
}

.upload-btn + .upload-btn {
  margin-left: 12px;
}
</style>
