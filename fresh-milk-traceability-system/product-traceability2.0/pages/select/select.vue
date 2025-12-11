<!-- pages/scan-result/scan-result.vue -->
<template>
  <view class="result-container">
    <!-- 返回按钮 -->
    <view class="back-btn" @click="navigateToHome">
      <text class="back-icon">←</text>
    </view>
    
    <view class="result-content">
      <!-- 扫码结果显示 -->
      <view class="scan-result-box" v-if="scanCode">
        <text class="result-label">扫码结果</text>
        <text class="result-value">{{ scanCode }}</text>
      </view>
      
      <view class="title">请选择要查看的信息</view>
      <view class="options">
        <view class="option-item" @click="navigateTo('logistics')">
          <view class="icon">🚚</view>
          <view class="text">物流信息</view>
        </view>
        <view class="option-item" @click="navigateTo('market')">
          <view class="icon">🏪</view>
          <view class="text">超市信息</view>
        </view>
        <view class="option-item" @click="navigateTo('factory')">
          <view class="icon">🏭</view>
          <view class="text">加工厂信息</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 扫码结果
const scanCode = ref('');

// 在页面加载时，接收扫码结果
onLoad((options) => {
  console.log('页面参数:', options);
  
  // 从URL参数获取扫码结果
  if (options.code) {
    scanCode.value = decodeURIComponent(options.code);
    console.log('扫码结果:', scanCode.value);
  }
  
  // 也可以从本地存储获取完整信息
  const storedResult = uni.getStorageSync('scanResult');
  if (storedResult) {
    console.log('存储的扫码信息:', storedResult);
    if (!scanCode.value && storedResult.result) {
      scanCode.value = storedResult.result;
    }
  }
});

// 导航到相应的详情页
const navigateTo = (type) => {
  let pagePath = '';
  
  switch (type) {
    case 'logistics':
      pagePath = '/pages/Logistics/Logistics'; // 物流信息页路径
      break;
    case 'market':
      pagePath = '/pages/Supermarket/Supermarket'; // 超市信息页路径
      break;
    case 'factory':
      pagePath = '/pages/Processing/Processing'; // 加工厂信息页路径
      break;
  }
  
  if (pagePath) {
    uni.navigateTo({
      url: pagePath,
      success: () => {
        console.log(`跳转到${type}页面成功`);
      },
      fail: (err) => {
        console.error(`跳转到${type}页面失败:`, err);
      }
    });
  }
};

// 返回首页
const navigateToHome = () => {
  uni.reLaunch({
    url: '/pages/home/home',
    success: () => {
      console.log('返回首页成功');
    },
    fail: (err) => {
      console.error('返回首页失败:', err);
    }
  });
};
</script>

<style scoped>
.result-container {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding-top: 60rpx; /* 预留顶部返回按钮空间 */
  box-sizing: border-box;
}

/* 返回按钮样式 */
.back-btn {
  position: absolute;
  top: 30rpx;
  left: 30rpx;
  z-index: 1000;
}

.back-icon {
  font-size: 48rpx;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.result-content {
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 扫码结果显示框 */
.scan-result-box {
  width: 100%;
  background-color: #e6f7ff;
  border: 1px solid #1980FF;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  display: flex;
  flex-direction: column;
}

.result-label {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.result-value {
  font-size: 26rpx;
  color: #1980FF;
  word-break: break-all;
  font-weight: 500;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  color: #333;
}

.options {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 25rpx;
  border: 1px solid #eee;
  border-radius: 12rpx;
  cursor: pointer;
  transition: background-color 0.2s;
}

.option-item:hover {
  background-color: #f5f5f5;
}

.option-item .icon {
  font-size: 40rpx;
  margin-right: 20rpx;
  width: 50rpx; /* 固定宽度，使文字对齐 */
  text-align: center;
}

.option-item .text {
  font-size: 28rpx;
  flex: 1;
}
</style>