<script setup>
import { ref } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRouter } from "vue-router"

const router = useRouter()
const statisticsData = ref([
  { id: "20250001", farmerId: "1234567890", purchaseId: "1301120517723", temperature: "10kg", price: 20, time: "2025.11.1" },
  { id: "20250002", farmerId: "1234567890", purchaseId: "1301120517723", temperature: "10kg", price: 20, time: "2025.11.1" },
  { id: "20250003", farmerId: "1234567890", purchaseId: "1301120517723", temperature: "10kg", price: 20, time: "2025.11.1" },
  { id: "20250004", farmerId: "1234567890", purchaseId: "1301120517723", temperature: "10kg", price: 20, time: "2025.11.1" }
])

const handleView = (item) => router.push({ path: '/record-detail', query: { id: item.id } })
const handleDelete = (item) => {
  ElMessageBox.confirm("您确认要删除吗?", "注意", { type: "warning" })
    .then(() => ElMessage.success("删除成功"))
}
</script>

<template>
  <div class="statistics-container">
    <div class="top-bar"><h1 class="page-title">统计信息</h1></div>
    <div class="statistics-overview">
      <div class="overview-item"><span class="overview-label">管理面积：</span><span class="overview-value">2025.11.1</span></div>
      <div class="overview-item"><span class="overview-label">当日收购量：</span><span class="overview-value">40kg</span></div>
      <div class="overview-item"><span class="overview-label">总收购量：</span><span class="overview-value">150kg</span></div>
    </div>
    <div class="statistics-table-wrapper">
      <table class="statistics-table">
        <thead><tr><th>收购记录编号</th><th>牧民身份证号</th><th>奶站编号</th><th>鲜奶重量</th><th>收购单价</th><th>收购时间</th><th>操作</th></tr></thead>
        <tbody>
          <tr v-for="item in statisticsData" :key="item.id">
            <td>{{ item.id }}</td><td>{{ item.farmerId }}</td><td>{{ item.purchaseId }}</td>
            <td>{{ item.temperature }}</td><td>{{ item.price }}</td><td>{{ item.time }}</td>
            <td><button @click="handleView(item)" class="action-btn">查看</button><button @click="handleDelete(item)" class="action-btn" style="color: red">删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.page-title { font-size: 20px; font-weight: 500; color: #303133; margin: 0; }
.statistics-overview { display: flex; gap: 30px; margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.overview-item { display: flex; align-items: center; gap: 10px; }
.overview-label { color: #606266; font-size: 14px; }
.overview-value { color: #303133; font-size: 16px; font-weight: 500; }
.statistics-table-wrapper { background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); min-height: 300px; }
.statistics-table { width: 100%; border-collapse: collapse; }
.statistics-table th, .statistics-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #ebeef5; }
.statistics-table th { background-color: #f5f7fa; font-weight: 500; color: #606266; }
.statistics-table tr:hover { background-color: #f5f7fa; }
.action-btn { padding: 4px 12px; border: 1px solid #dcdfe6; border-radius: 4px; background-color: #fff; cursor: pointer; margin-right: 5px; }
.action-btn:hover { border-color: #409eff; color: #409eff; }
</style>



