<template>
  <view class="scan-page">
    <!-- 顶部标题栏 -->
    <view class="scan-header">
      <text class="title">扫码溯源</text>
    </view>

    <!-- 扫码按钮 -->
    <view class="scan-btn" @click="openScan">
      <image src="https://via.placeholder.com/120x120?text=扫码" mode="aspectFit" class="scan-icon" />
      <text class="btn-text">点击扫码查询溯源信息</text>
    </view>

    <!-- 扫码结果展示（失败时显示，成功后直接跳转） -->
    <view class="result-box" v-if="scanResult === '扫码失败'">
      <text class="result-label">扫码结果：</text>
      <text class="result-content error-color">{{ scanResult }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 扫码结果（仅用于展示失败状态）
const scanResult = ref('');

// 打开摄像头扫码
const openScan = () => {
  uni.scanCode({
    scanType: ['qrCode', 'barCode'], // 支持二维码和条形码
    onlyFromCamera: true, // 仅从摄像头扫码（不允许选择相册）
    success: (res) => {
      const scanCode = res.result || '';
      // 扫码成功：跳转至 select.vue，并携带扫码结果参数
      if (scanCode) {
        uni.navigateTo({
          url: `/pages/select/select?scanCode=${encodeURIComponent(scanCode)}`, // 携带参数跳转
          success: () => {
            uni.showToast({ title: '扫码成功，跳转中...', icon: 'success', duration: 1500 });
            scanResult.value = ''; // 清空失败状态显示
          },
          fail: (err) => {
            uni.showToast({ title: '跳转失败，请重试', icon: 'none' });
            console.log('跳转select页面失败：', err);
          }
        });
      } else {
        // 有扫码回调但无结果（异常情况）
        scanResult.value = '扫码失败';
        uni.showToast({ title: '扫码失败，未获取到有效信息', icon: 'none', duration: 1500 });
      }
    },
    fail: (err) => {
      // 扫码失败：仅提示，不跳转
      scanResult.value = '扫码失败';
      uni.showToast({ title: '扫码失败，请重试', icon: 'none', duration: 1500 });
      console.log('扫码失败详情：', err);
    }
  });
};
</script>

<style scoped>
.scan-page {
  background-color: #f5f5f5;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx 20rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.scan-header {
  width: 100%;
  text-align: center;
  margin-bottom: 80rpx;
}

.title {
  font-size: 32rpx;
  color: #333;
  font-weight: 600;
}

.scan-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 280rpx;
  height: 280rpx;
  border-radius: 50%;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 60rpx;
  cursor: pointer;
}

.scan-icon {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
}

.btn-text {
  font-size: 24rpx;
  color: #333;
  text-align: center;
  padding: 0 20rpx;
}

.result-box {
  background-color: #fff;
  width: 100%;
  padding: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.result-label {
  font-size: 26rpx;
  color: #666;
  margin-right: 10rpx;
}

.result-content {
  font-size: 26rpx;
  color: #1980FF;
  word-break: break-all;
  display: block;
  margin-top: 10rpx;
}

/* 失败状态文字颜色 */
.error-color {
  color: #ff4d4f;
}

.query-btn {
  margin-top: 20rpx;
  background-color: #1980FF;
  color: #fff;
  border-radius: 8rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
}

.query-btn::after {
  border: none;
}
</style>