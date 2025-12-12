<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const farmerId = route.query.id
const isEditMode = !!farmerId
const loading = ref(false)

const farmerForm = reactive({ phone: '', contact_phone: '', name: '', address: '' })

const handleSave = async () => {
  loading.value = true
  const storedFarmers = JSON.parse(localStorage.getItem('farmers') || '[]')
  if (isEditMode) {
    const index = storedFarmers.findIndex(f => f.id === Number(farmerId))
    if (index !== -1) storedFarmers[index] = { ...farmerForm, id: Number(farmerId) }
    ElMessage.success('编辑成功')
  } else {
    const newId = storedFarmers.length > 0 ? Math.max(...storedFarmers.map(f => f.id)) + 1 : 1
    storedFarmers.push({ ...farmerForm, id: newId })
    ElMessage.success('新增成功')
  }
  localStorage.setItem('farmers', JSON.stringify(storedFarmers))
  loading.value = false
  router.push('/farmers')
}

const handleBack = () => router.push('/farmers')

onMounted(() => {
  if (isEditMode) {
    const storedFarmers = JSON.parse(localStorage.getItem('farmers') || '[]')
    const farmer = storedFarmers.find(f => f.id === Number(farmerId))
    if (farmer) Object.assign(farmerForm, farmer)
  }
})
</script>

<template>
  <div class="form-container">
    <div class="form-header"><h2>{{ isEditMode ? '编辑牧民信息' : '新增牧民信息' }}</h2></div>
    <h3 class="section-title">基础信息</h3>
    <el-form :model="farmerForm" label-width="120px">
      <el-form-item label="*身份证号"><el-input v-model="farmerForm.phone" placeholder="请输入身份证号" /></el-form-item>
      <el-form-item label="*联系方式"><el-input v-model="farmerForm.contact_phone" placeholder="请输入联系方式" /></el-form-item>
      <el-form-item label="*姓名"><el-input v-model="farmerForm.name" placeholder="请输入姓名" /></el-form-item>
      <el-form-item label="*家庭住址"><el-input v-model="farmerForm.address" placeholder="请输入家庭住址" /></el-form-item>
      <el-form-item>
        <el-button @click="handleBack" :loading="loading">返回</el-button>
        <el-button type="primary" @click="handleSave" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form-container { background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.form-header { margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #ebeef5; }
.form-header h2 { margin: 0; font-size: 18px; font-weight: 500; color: #303133; }
.section-title { font-size: 16px; font-weight: 500; color: #303133; margin-bottom: 15px; }
</style>



