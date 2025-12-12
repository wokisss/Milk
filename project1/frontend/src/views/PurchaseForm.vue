<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { purchaseAPI, farmerAPI } from '../api'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 获取路由参数
const purchaseId = route.query.id
const isViewMode = route.query.view === 'true'

// 判断是新增、编辑还是查看模式
const isAddMode = !purchaseId
const isEditMode = purchaseId && !isViewMode

// 表单标题
const formTitle = computed(() => {
  if (isAddMode) return '新增收购记录'
  if (isEditMode) return '编辑收购记录'
  return '查看收购记录'
})

// 牧民列表数据
const farmers = ref([])
// 表单数据
const form = reactive({
  id: '',
  farmer_id: '',
  purchase_date: new Date(),
  quantity: 0,
  unit_price: 0,
  amount: 0,
  quality: '一级',
  operator: '',
  notes: ''
})

// 表单规则
const rules = {
  farmer_id: [{ required: true, message: '请选择牧民', trigger: 'change' }],
  purchase_date: [{ required: true, message: '请选择收购日期', trigger: 'change' }],
  quantity: [{ required: true, message: '请输入收购数量', trigger: 'blur' }],
  unit_price: [{ required: true, message: '请输入单价', trigger: 'blur' }],
  quality: [{ required: true, message: '请选择质量等级', trigger: 'change' }],
  operator: [{ required: true, message: '请输入操作员姓名', trigger: 'blur' }]
}

const formRef = ref(null)
const loading = ref(false)

const qualityOptions = [
  { label: '一级', value: '一级' },
  { label: '二级', value: '二级' },
  { label: '三级', value: '三级' }
]

// 获取牧民列表
const fetchFarmers = async () => {
  try {
    const response = await farmerAPI.getFarmers()
    if (response.success) {
      farmers.value = response.data
    }
  } catch (error) {
    console.error('获取牧民列表错误:', error)
  }
}

// 获取收购记录详情
const fetchPurchaseDetail = async () => {
  if (!purchaseId) return
  loading.value = true
  try {
    if (isViewMode) {
      const storedPurchase = localStorage.getItem('currentPurchase')
      if (storedPurchase) {
        const purchaseData = JSON.parse(storedPurchase)
        if (String(purchaseData.id) === String(purchaseId)) {
          if (purchaseData.purchase_date) {
            purchaseData.purchase_date = new Date(purchaseData.purchase_date)
          }
          Object.assign(form, purchaseData)
          loading.value = false
          return
        }
      }
    }
    const response = await purchaseAPI.getPurchase(purchaseId)
    if (response.success) {
      if (response.data.purchase_date) {
        response.data.purchase_date = new Date(response.data.purchase_date)
      }
      Object.assign(form, response.data)
    } else {
      ElMessage.error('获取收购记录失败')
      router.push('/purchases')
    }
  } catch (error) {
    console.error('获取收购记录错误:', error)
    router.push('/purchases')
  } finally {
    loading.value = false
  }
}

// 计算金额
const calculateAmount = () => {
  form.amount = (form.quantity * form.unit_price).toFixed(2)
}

// 提交表单
const handleSubmit = async () => {
  await formRef.value.validate()
  calculateAmount()
  loading.value = true
  try {
    const submitData = { ...form }
    if (submitData.purchase_date) {
      submitData.purchase_date = submitData.purchase_date.toISOString().split('T')[0]
    }
    let response
    if (isAddMode) {
      response = await purchaseAPI.addPurchase(submitData)
    } else {
      response = await purchaseAPI.updatePurchase(purchaseId, submitData)
    }
    if (response.success) {
      ElMessage.success(isAddMode ? '新增成功' : '更新成功')
      router.push('/purchases')
    } else {
      ElMessage.error(response.message || '操作失败')
    }
  } catch (error) {
    console.error('保存收购记录错误:', error)
    ElMessage.error('保存失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => router.push('/purchases')

onMounted(async () => {
  await fetchFarmers()
  if (!isAddMode) await fetchPurchaseDetail()
})
</script>

<template>
  <div class="purchase-form-container">
    <div class="form-header">
      <h1 class="form-title">{{ formTitle }}</h1>
      <el-button @click="handleCancel">返回列表</el-button>
    </div>
    
    <el-form ref="formRef" :model="form" :rules="rules" class="purchase-form" label-position="top" :disabled="isViewMode">
      <el-form-item label="记录ID" v-if="!isAddMode">
        <el-input v-model="form.id" disabled />
      </el-form-item>
      <el-form-item label="选择牧民" prop="farmer_id">
        <el-select v-model="form.farmer_id" placeholder="请选择牧民" filterable style="width: 100%">
          <el-option v-for="farmer in farmers" :key="farmer.id" :label="farmer.name" :value="farmer.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="收购日期" prop="purchase_date">
        <el-date-picker v-model="form.purchase_date" type="date" placeholder="选择收购日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="收购数量(kg)" prop="quantity">
        <el-input-number v-model="form.quantity" :min="0.01" :step="0.01" :precision="2" @change="calculateAmount" style="width: 100%" />
      </el-form-item>
      <el-form-item label="单价(元/kg)" prop="unit_price">
        <el-input-number v-model="form.unit_price" :min="0.01" :step="0.01" :precision="2" @change="calculateAmount" style="width: 100%" />
      </el-form-item>
      <el-form-item label="金额(元)">
        <el-input v-model="form.amount" placeholder="金额" readonly />
      </el-form-item>
      <el-form-item label="质量等级" prop="quality">
        <el-select v-model="form.quality" placeholder="请选择质量等级" style="width: 100%">
          <el-option v-for="option in qualityOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作员" prop="operator">
        <el-input v-model="form.operator" placeholder="请输入操作员姓名" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.notes" type="textarea" placeholder="请输入备注信息" :rows="3" />
      </el-form-item>
      <el-form-item v-if="!isViewMode">
        <el-button type="primary" @click="handleSubmit" :loading="loading">{{ isAddMode ? '提交' : '保存修改' }}</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.purchase-form-container { padding: 0; }
.form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.form-title { font-size: 20px; font-weight: 500; color: #303133; margin: 0; }
.purchase-form { background-color: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); max-width: 600px; }
</style>



