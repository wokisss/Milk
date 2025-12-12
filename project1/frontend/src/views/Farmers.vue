<script setup>
import { ref, onMounted, computed } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"

const router = useRouter()
const farmers = ref([])
const loading = ref(false)
const searchQuery = ref("")
const viewDialogVisible = ref(false)
const editDialogVisible = ref(false)
const currentFarmer = ref({})
const editFarmer = ref({})
const editFormRef = ref()

const mockFarmers = [
  { id: 1, name: "张三", phone: "13800138001", address: "内蒙古呼伦贝尔市新巴尔虎左旗", contact_phone: "13800138001" },
  { id: 2, name: "李四", phone: "13800138002", address: "内蒙古呼伦贝尔市新巴尔虎右旗", contact_phone: "13800138002" },
  { id: 3, name: "王五", phone: "13800138003", address: "内蒙古呼伦贝尔市陈巴尔虎旗", contact_phone: "13800138003" },
  { id: 4, name: "赵六", phone: "13800138004", address: "内蒙古呼伦贝尔市鄂温克族自治旗", contact_phone: "13800138004" },
  { id: 5, name: "钱七", phone: "13800138005", address: "内蒙古呼伦贝尔市海拉尔区", contact_phone: "13800138005" }
]

const fetchFarmers = async () => {
  loading.value = true
  const stored = JSON.parse(localStorage.getItem('farmers') || '[]')
  farmers.value = stored.length > 0 ? stored : mockFarmers
  if (stored.length === 0) localStorage.setItem('farmers', JSON.stringify(mockFarmers))
  loading.value = false
  ElMessage.success("加载牧民数据成功")
}

const handleAddFarmer = () => router.push("/farmer-form")
const handleEditFarmer = (id) => { editFarmer.value = { ...farmers.value.find(f => f.id === id) }; editDialogVisible.value = true }
const handleViewFarmer = (id) => { currentFarmer.value = { ...farmers.value.find(f => f.id === id) }; viewDialogVisible.value = true }
const handleDeleteFarmer = (id, name) => {
  ElMessageBox.confirm(`确定要删除牧民「${name}」吗？`, "确认删除", { type: "warning" })
    .then(() => { farmers.value = farmers.value.filter(f => f.id !== id); ElMessage.success("删除成功") })
    .catch(() => ElMessage.info("已取消删除"))
}
const handleSaveEdit = async () => {
  const index = farmers.value.findIndex(f => f.id === editFarmer.value.id)
  if (index !== -1) farmers.value[index] = { ...editFarmer.value }
  ElMessage.success('修改成功')
  editDialogVisible.value = false
}

const filteredFarmers = computed(() => {
  if (!searchQuery.value) return farmers.value
  const query = searchQuery.value.toLowerCase()
  return farmers.value.filter(f => f.name.toLowerCase().includes(query) || f.phone.includes(query) || f.address.toLowerCase().includes(query))
})

onMounted(() => fetchFarmers())
</script>

<template>
  <div class="farmers-container">
    <div class="top-bar">
      <h1 class="page-title">牧民信息管理</h1>
      <div class="action-buttons">
        <el-input v-model="searchQuery" placeholder="输入牧民身份证号" style="width: 200px; margin-right: 10px">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary">查询牧民</el-button>
        <el-button type="primary" @click="handleAddFarmer">新建牧民</el-button>
      </div>
    </div>
    <el-table :data="filteredFarmers" style="width: 100%" :loading="loading" border stripe>
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="phone" label="身份证号" width="150" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="contact_phone" label="联系方式" width="130" />
      <el-table-column prop="address" label="家庭住址" />
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleViewFarmer(scope.row.id)">查看</el-button>
          <el-button type="success" size="small" @click="handleEditFarmer(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDeleteFarmer(scope.row.id, scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="viewDialogVisible" title="查看牧民信息" width="500px">
      <el-form :model="currentFarmer" label-width="100px">
        <el-form-item label="编号"><el-input v-model="currentFarmer.id" disabled /></el-form-item>
        <el-form-item label="身份证号"><el-input v-model="currentFarmer.phone" disabled /></el-form-item>
        <el-form-item label="姓名"><el-input v-model="currentFarmer.name" disabled /></el-form-item>
        <el-form-item label="联系方式"><el-input v-model="currentFarmer.contact_phone" disabled /></el-form-item>
        <el-form-item label="家庭住址"><el-input v-model="currentFarmer.address" disabled /></el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" title="修改牧民信息" width="500px" :show-close="false">
      <el-form ref="editFormRef" :model="editFarmer" label-width="100px">
        <el-form-item label="身份证号"><el-input v-model="editFarmer.phone" /></el-form-item>
        <el-form-item label="联系方式"><el-input v-model="editFarmer.contact_phone" /></el-form-item>
        <el-form-item label="姓名"><el-input v-model="editFarmer.name" /></el-form-item>
        <el-form-item label="家庭住址"><el-input v-model="editFarmer.address" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.farmers-container { width: 100%; }
.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.page-title { font-size: 20px; font-weight: 500; color: #303133; margin: 0; }
.action-buttons { display: flex; align-items: center; gap: 10px; }
</style>



