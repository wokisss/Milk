<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const form = ref({ username: '', password: '' })
const formRef = ref(null)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  try {
    await formRef.value.validate()
    if (form.value.username === 'admin' && form.value.password === 'admin123') {
      localStorage.setItem('token', 'mock_token_' + Date.now())
      ElMessage.success('登录成功')
      setTimeout(() => router.push('/farmers'), 300)
    } else {
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    ElMessage.error('请填写完整信息')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <h2 class="login-title">鲜奶收购子系统</h2>
      <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password @keyup.enter="handleLogin">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background-image: url('../assets/images/1.jpg'); background-size: cover; background-position: center; }
.login-form-wrapper { width: 400px; background-color: rgba(255,255,255,0.95); border-radius: 8px; padding: 40px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); text-align: center; }
.login-title { text-align: center; margin-bottom: 30px; color: #303133; font-size: 24px; font-weight: 600; }
.login-form { width: 100%; margin-top: 20px; }
.login-button { width: 100%; height: 40px; font-size: 16px; background-color: #1890ff; border-color: #1890ff; }
</style>

