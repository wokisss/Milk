<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"

const router = useRouter()
const searchQuery = ref("")
const dateRange = ref(null)

const purchaseForm = ref({
  farmer_id_card: "", farmer_address: "", farmer_contact: "",
  unit_price: "", purchase_time: "", purchase_location: "", weight: "", total_price: ""
})

const formRef = ref(null)
const formRules = {
  farmer_id_card: [{ required: true, message: "请输入牧民身份证号", trigger: "blur" }],
  farmer_address: [{ required: true, message: "请输入牧民家庭住址", trigger: "blur" }],
  farmer_contact: [{ required: true, message: "请输入牧民联系方式", trigger: "blur" }],
  unit_price: [{ required: true, message: "请输入收购单价", trigger: "blur" }],
  purchase_time: [{ required: true, message: "请选择收购时间", trigger: "change" }],
  purchase_location: [{ required: true, message: "请输入收购地点", trigger: "blur" }],
  weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
  total_price: [{ required: true, message: "请输入成交价格", trigger: "blur" }]
}

const handleAddPurchase = () => router.push("/purchase-form")
const handleSave = async () => {
  try {
    await formRef.value.validate()
    ElMessage.success("保存成功")
  } catch (error) {
    ElMessage.error("请填写所有必填字段")
  }
}
</script>

<template>
  <div class="purchases-container">
    <div class="top-bar">
      <h1 class="page-title">收购记录查询</h1>
      <div class="action-buttons">
        <el-input v-model="searchQuery" placeholder="搜索牧民姓名或奶站编号" style="width: 250px; margin-right: 10px">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="margin-right: 10px" />
        <el-button type="primary" @click="handleAddPurchase">新增记录</el-button>
      </div>
    </div>
    <div class="form-container">
      <el-form ref="formRef" :model="purchaseForm" :rules="formRules" label-width="120px" size="default">
        <el-row :gutter="20">
          <el-col :span="12"><el-form-item label="牧民身份证号" prop="farmer_id_card"><el-input v-model="purchaseForm.farmer_id_card" placeholder="请输入牧民身份证号" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="牧民联系方式" prop="farmer_contact"><el-input v-model="purchaseForm.farmer_contact" placeholder="请输入牧民联系方式" /></el-form-item></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><el-form-item label="牧民家庭住址" prop="farmer_address"><el-input v-model="purchaseForm.farmer_address" placeholder="请输入牧民家庭住址" /></el-form-item></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"><el-form-item label="收购单价" prop="unit_price"><el-input v-model="purchaseForm.unit_price" placeholder="请输入收购单价"><template #append>元/kg</template></el-input></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="收购时间" prop="purchase_time"><el-date-picker v-model="purchaseForm.purchase_time" type="datetime" placeholder="请选择收购时间" format="YYYY-MM-DD HH:mm:ss" style="width: 100%" /></el-form-item></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><el-form-item label="收购地点" prop="purchase_location"><el-input v-model="purchaseForm.purchase_location" placeholder="请输入收购地点" /></el-form-item></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"><el-form-item label="重量" prop="weight"><el-input v-model="purchaseForm.weight" placeholder="请输入重量"><template #append>kg</template></el-input></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="成交价格" prop="total_price"><el-input v-model="purchaseForm.total_price" placeholder="请输入成交价格"><template #append>元</template></el-input></el-form-item></el-col>
        </el-row>
        <el-row><el-col :span="24" style="text-align: center"><el-button type="primary" @click="handleSave" size="large">保存</el-button></el-col></el-row>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.page-title { font-size: 20px; font-weight: 500; color: #303133; margin: 0; }
.action-buttons { display: flex; align-items: center; }
.form-container { background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); padding: 30px; }
.el-form { max-width: 800px; margin: 0 auto; }
</style>



