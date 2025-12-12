<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { ElMessage } from "element-plus"

const route = useRoute()
const detailData = ref({ farmerId: '', purchaseId: '', weight: '', price: '', time: '', location: '' })
const loading = ref(false)

onMounted(async () => {
  const id = route.query.id
  if (!id) { ElMessage.warning('未找到记录ID'); return }
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  const mockDataMap = {
    '20250001': { farmerId: '123456789', purchaseId: '20256161', weight: '12kg', price: '15', time: '2025.11.1', location: '四川成都' },
    '20250002': { farmerId: '987654321', purchaseId: '20256162', weight: '15kg', price: '18', time: '2025.11.1', location: '内蒙古呼和浩特' },
    '20250003': { farmerId: '567890123', purchaseId: '20256163', weight: '18kg', price: '20', time: '2025.11.1', location: '黑龙江哈尔滨' },
    '20250004': { farmerId: '345678901', purchaseId: '20256164', weight: '20kg', price: '22', time: '2025.11.1', location: '青海西宁' }
  }
  detailData.value = mockDataMap[id] || { farmerId: '未知', purchaseId: '未知', weight: '未知', price: '未知', time: '未知', location: '未知' }
  loading.value = false
})
</script>

<template>
  <div class="record-detail-container">
    <div class="top-bar"><h1 class="page-title">统计记录详情</h1></div>
    <div class="record-detail-content">
      <el-card class="detail-card">
        <h2 class="section-title">基础信息</h2>
        <el-form label-position="top">
          <el-row :gutter="20">
            <el-col :span="12"><el-form-item label="牧民身份证号"><el-input v-model="detailData.farmerId" disabled /></el-form-item></el-col>
            <el-col :span="12"><el-form-item label="奶站编号"><el-input v-model="detailData.purchaseId" disabled /></el-form-item></el-col>
            <el-col :span="12"><el-form-item label="鲜奶重量"><el-input v-model="detailData.weight" disabled /></el-form-item></el-col>
            <el-col :span="12"><el-form-item label="收购单价"><el-input v-model="detailData.price" disabled /></el-form-item></el-col>
            <el-col :span="12"><el-form-item label="收购时间"><el-input v-model="detailData.time" disabled /></el-form-item></el-col>
            <el-col :span="12"><el-form-item label="收购地点"><el-input v-model="detailData.location" disabled /></el-form-item></el-col>
          </el-row>
        </el-form>
      </el-card>
      <div class="action-buttons"><router-link to="/statistics"><el-button type="primary">返回列表</el-button></router-link></div>
    </div>
  </div>
</template>

<style scoped>
.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.page-title { font-size: 20px; font-weight: 500; color: #303133; margin: 0; }
.section-title { font-size: 16px; font-weight: 500; color: #303133; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid #eee; }
.detail-card { background-color: #fff; border-radius: 4px; padding: 20px; }
.action-buttons { display: flex; justify-content: center; margin-top: 20px; }
</style>



