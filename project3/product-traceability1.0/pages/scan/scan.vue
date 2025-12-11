<template>
  <view class="scan-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="title">扫码</view>
    </view>

    <!-- 模拟扫码区域 -->
    <view class="scan-wrapper">
      <view class="scan-view">
        <!-- 扫码框 -->
        <view class="scan-frame">
          <!-- 四个角 -->
          <view class="corner top-left"></view>
          <view class="corner top-right"></view>
          <view class="corner bottom-left"></view>
          <view class="corner bottom-right"></view>
          
          <!-- 扫描线 -->
          <view class="scan-line" :style="{ top: scanLineTop + 'px' }"></view>
        </view>
        
        <!-- 提示文字 -->
        <view class="scan-tip">请将二维码/条形码放入框内</view>
      </view>
    </view>
    
    <!-- 底部操作提示 -->
    <view class="action-tip">
      <text>支持识别二维码、条形码</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 扫描线的位置
const scanLineTop = ref(0);
let animationTimer = null;
// 新增：用于跳转的定时器
let redirectTimer = null;

// 页面加载时，启动扫描线动画和跳转定时器
onMounted(() => {
  startScanAnimation();
  
  // 6 秒后自动跳转到 select.vue
  redirectTimer = setTimeout(() => {
    uni.navigateTo({
      url: '/pages/select/select' // 请确保路径正确
    });
  }, 3000); // 3000 毫秒 = 3秒
});

// 页面卸载时，清除所有定时器
onUnmounted(() => {
  if (animationTimer) {
    clearInterval(animationTimer);
  }
  if (redirectTimer) {
    clearTimeout(redirectTimer);
  }
});

// 扫描线动画
const startScanAnimation = () => {
  animationTimer = setInterval(() => {
    scanLineTop.value += 2;
    if (scanLineTop.value > 200) { // 200是扫码框的高度
      scanLineTop.value = 0;
    }
  }, 30);
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<!-- 禁止浏览器滚动 -->
<style>
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
</style>

<style scoped>
/* 页面整体背景 */
.scan-container {
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  box-sizing: border-box;
  padding-bottom: 50px;
}

/* 顶部导航栏 */
.nav-bar {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
}

.back-btn {
  font-size: 18px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 模拟扫码区域 */
.scan-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.scan-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 扫码框 */
.scan-frame {
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  margin-bottom: 20px;
}

/* 扫码框的四个角 */
.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #1980FF;
}
.top-left { top: -3px; left: -3px; border-right: none; border-bottom: none; }
.top-right { top: -3px; right: -3px; border-left: none; border-bottom: none; }
.bottom-left { bottom: -3px; left: -3px; border-right: none; border-top: none; }
.bottom-right { bottom: -3px; right: -3px; border-left: none; border-top: none; }

/* 扫描线 */
.scan-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1980FF;
  transition: top 0.03s linear;
}

/* 扫码提示文字 */
.scan-tip {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* 底部操作提示 */
.action-tip {
  padding: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
}
</style>