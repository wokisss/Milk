<script setup>
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"

const router = useRouter()
const activeTab = ref("info")
const loading = ref(false)
const passwordLoading = ref(false)
const passwordFormRef = ref(null)

const userInfo = reactive({ name: "七尾", phone: "18890900999", wechat: "", location: "", stationId: "" })
const passwordForm = reactive({ oldPassword: "", newPassword: "", confirmPassword: "" })

const passwordRules = {
  oldPassword: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }, { min: 6, message: "密码不少于6个字符", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请确认新密码", trigger: "blur" }, { validator: (rule, value, callback) => { value !== passwordForm.newPassword ? callback(new Error("两次输入的密码不一致")) : callback() }, trigger: "blur" }]
}

const showTab = (tab) => activeTab.value = tab
const resetPasswordForm = () => passwordFormRef.value?.resetFields()
const handleUpdatePassword = async () => {
  await passwordFormRef.value.validate()
  passwordLoading.value = true
  if (passwordForm.oldPassword === "admin") {
    ElMessage.success("密码修改成功，请重新登录")
    setTimeout(() => { localStorage.removeItem("token"); router.push("/") }, 1500)
  } else {
    ElMessage.error("旧密码错误")
  }
  passwordLoading.value = false
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-content">
      <div class="profile-main">
        <div v-if="activeTab === 'info'" class="tab-content">
          <el-card class="info-card">
            <template #header><span class="card-title">个人信息</span></template>
            <div class="form-layout">
              <div class="form-sidebar">
                <ul class="menu-list">
                  <li class="menu-item active" @click="showTab('info')">个人信息</li>
                  <li class="menu-item" @click="showTab('password')">修改密码</li>
                </ul>
              </div>
              <div class="form-content">
                <el-form label-position="top">
                  <el-form-item label="姓名*"><el-input v-model="userInfo.name" placeholder="请输入" /></el-form-item>
                  <el-form-item label="微信"><el-input v-model="userInfo.wechat" placeholder="请输入" /></el-form-item>
                  <el-form-item label="电话*"><el-input v-model="userInfo.phone" placeholder="请输入" /></el-form-item>
                  <el-form-item label="所属地点"><el-input v-model="userInfo.location" placeholder="请输入" /></el-form-item>
                  <el-form-item label="所属奶站编号"><el-input v-model="userInfo.stationId" placeholder="请输入" /></el-form-item>
                </el-form>
              </div>
            </div>
          </el-card>
        </div>
        <div v-if="activeTab === 'password'" class="tab-content">
          <el-card>
            <template #header><span class="card-title">修改密码</span></template>
            <div class="form-layout">
              <div class="form-sidebar">
                <ul class="menu-list">
                  <li class="menu-item" @click="showTab('info')">个人信息</li>
                  <li class="menu-item active" @click="showTab('password')">修改密码</li>
                </ul>
              </div>
              <div class="form-content">
                <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-position="top">
                  <el-form-item label="当前密码" prop="oldPassword"><el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入当前密码" /></el-form-item>
                  <el-form-item label="新密码" prop="newPassword"><el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" /></el-form-item>
                  <el-form-item label="确认新密码" prop="confirmPassword"><el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" /></el-form-item>
                  <el-form-item><el-button type="primary" @click="handleUpdatePassword" :loading="passwordLoading">确认修改</el-button><el-button @click="resetPasswordForm">取消</el-button></el-form-item>
                </el-form>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-content { display: flex; gap: 30px; }
.profile-main { flex: 1; }
.tab-content { background-color: #fff; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.card-title { font-size: 18px; font-weight: 500; color: #303133; }
.form-layout { display: flex; min-height: 400px; }
.form-sidebar { width: 180px; padding: 10px 0; background-color: #f5f5f5; border: 1px solid #eee; }
.menu-list { list-style: none; padding: 0; margin: 0; }
.menu-item { padding: 16px 20px; cursor: pointer; border-bottom: 1px solid #e4e7ed; }
.menu-item:hover { background-color: #e6e8eb; }
.menu-item.active { background-color: #165DFF; color: #fff; }
.form-content { flex: 1; padding: 20px; }
</style>



