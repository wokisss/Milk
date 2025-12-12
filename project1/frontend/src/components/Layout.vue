<script setup>
import { ref, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { User, Goods, DataAnalysis, Avatar, SwitchButton, ArrowDown } from "@element-plus/icons-vue"

const router = useRouter()
const menuItems = [
  { index: "/farmers", label: "牧民信息", icon: User },
  { index: "/purchases", label: "收购信息", icon: Goods },
  { index: "/statistics", label: "统计信息", icon: DataAnalysis },
  { index: "/profile", label: "个人中心", icon: Avatar }
]

const activeIndex = ref(router.currentRoute.value.path)
watch(() => router.currentRoute.value.path, (newPath) => { activeIndex.value = newPath })

const currentUser = ref({ name: "管理员" })
const showMenu = ref(false)
const toggleMenu = () => { showMenu.value = !showMenu.value }
const goToProfile = () => { showMenu.value = false; router.push("/profile") }
const handleLogout = () => {
  showMenu.value = false
  localStorage.removeItem("token")
  ElMessage.success("已退出登录")
  router.push("/")
}

onMounted(() => {
  document.addEventListener("click", (e) => {
    const userMenu = document.querySelector(".custom-user-menu")
    if (userMenu && !userMenu.contains(e.target)) showMenu.value = false
  })
})
</script>

<template>
  <div class="layout-container">
    <div class="sidebar">
      <div class="sidebar-header"><h3 class="system-title">鲜奶收购系统</h3></div>
      <el-menu :default-active="activeIndex" class="main-menu" background-color="#1274fb" text-color="#fff" active-text-color="#fff" router unique-opened mode="vertical">
        <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index" @click="activeIndex = item.index" class="menu-item">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.label }}</template>
        </el-menu-item>
      </el-menu>
      <div class="sidebar-footer">
        <el-button type="primary" plain @click="handleLogout" style="width: 100%">
          <el-icon><SwitchButton /></el-icon> 退出登录
        </el-button>
      </div>
    </div>
    <div class="main-content">
      <div class="basic-nav">
        <div class="nav-title"></div>
        <div class="nav-right">
          <div class="custom-user-menu" @click.stop="toggleMenu">
            <img src="../assets/images/头像.png" alt="头像" style="width: 32px; height: 32px; border-radius: 50%;" />
            <span class="user-greeting">你好，{{ currentUser.name }}！</span>
            <el-icon class="arrow-icon"><ArrowDown /></el-icon>
          </div>
          <div v-if="showMenu" class="admin-dropdown-menu" @click.stop>
            <div @click="goToProfile">个人中心</div>
            <div class="menu-divider"></div>
            <div @click="handleLogout">退出登录</div>
          </div>
        </div>
      </div>
      <div class="content-wrapper"><router-view /></div>
    </div>
  </div>
</template>

<style scoped>
.layout-container { display: flex; min-height: 100vh; background-color: #f0f2f5; }
.sidebar { width: 200px; height: 100vh; background-color: #1274fb; color: #fff; display: flex; flex-direction: column; position: fixed; left: 0; top: 0; z-index: 1000; box-shadow: 2px 0 8px rgba(0,0,0,0.1); }
.sidebar-header { padding: 20px 0; text-align: center; border-bottom: 1px solid #0d5ec6; background-color: #0d5ec6; }
.system-title { font-size: 18px; font-weight: bold; color: #fff; margin: 0; }
.main-menu { background-color: #1274fb !important; border-right: none !important; flex: 1; }
.menu-item { height: 50px !important; line-height: 50px !important; font-size: 14px; color: #fff !important; background-color: transparent !important; }
.menu-item:hover, .menu-item.is-active { background-color: #0d5ec6 !important; }
.sidebar-footer { padding: 20px; border-top: 1px solid #0d5ec6; }
.main-content { flex: 1; margin-left: 200px; min-height: 100vh; width: calc(100% - 200px); display: flex; flex-direction: column; background-color: #f0f2f5; }
.basic-nav { height: 60px; background-color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.08); display: flex; align-items: center; padding: 0 30px; border-bottom: 1px solid #eee; }
.nav-right { margin-left: auto; display: flex; align-items: center; position: relative; }
.custom-user-menu { cursor: pointer; padding: 8px 16px; color: #606266; font-size: 14px; border-radius: 4px; display: flex; align-items: center; gap: 8px; }
.custom-user-menu:hover { background-color: #f5f7fa; color: #1274fb; }
.admin-dropdown-menu { position: absolute; right: 0; top: calc(100% + 10px); z-index: 1000; min-width: 120px; background: #fff; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.admin-dropdown-menu > div { padding: 10px 20px; cursor: pointer; font-size: 14px; color: #606266; }
.admin-dropdown-menu > div:hover { background-color: #f5f7fa; }
.menu-divider { height: 1px; background: #eee; margin: 5px 0; cursor: default; }
.content-wrapper { flex: 1; overflow-y: auto; padding: 20px; width: 100%; }
</style>



