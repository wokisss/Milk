<template>
  <view class="unlogin-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="title">我的</view>
    </view>

    <!-- 卡通图标区域 -->
    <view class="icon-container">
      <view class="icon-bg">
        <image src="/static/cartoon-icon.png" class="cartoon-icon" mode="widthFix" />
      </view>
    </view>

    <!-- 未登录提示与按钮 -->
    <view class="unlogin-tip">
      
    </view>
    <view class="login-btn" @click="goToLogin">
      立即登录
    </view>

    <!-- 底部导航栏（保持与已登录状态一致） -->
    <view class="tab-bar">
      <view class="tab-item" @click="goToHome">
        <image src="/static/home.png" class="tab-icon" mode="widthFix" />
        <text>首页</text>
      </view>
      <view class="tab-item active">
        <image src="/static/mine-active.png" class="tab-icon" mode="widthFix" />
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

// 跳转到登录页
const goToLogin = () => {
  router.push('/pages/login/login');
};

// 跳转到首页
const goToHome = () => {
  router.push('/pages/home/home');
};
onMounted(() => {
  // 页面渲染完成后，找到返回箭头的父元素并隐藏
  const backBtn = document.querySelector('.uni-page-head-hd');
  if (backBtn) {
    backBtn.style.display = 'none';
  }
});
</script>

<style scoped>
	/* 在你的页面的 style 标签内添加 */
page {
	  overflow: hidden;
	  height: 100%;
	}
.unlogin-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.nav-bar {
  height: 88rpx;
  background-color: #1980FF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
}

.icon-container {
  display: flex;
  justify-content: center;
  padding: 60rpx 0;
}

.icon-bg {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background-color: #ffebee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cartoon-icon {
  width: 120rpx;
  height: 120rpx;
}

.unlogin-tip {
  text-align: center;
  font-size: 30rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.login-btn {
  width: calc(100% - 80rpx);
  height: 90rpx;
  background-color: #1980FF;
  color: #fff;
  font-size: 32rpx;
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 60rpx;
  font-weight: 500;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-icon {
  width: 40rpx;
  height: 40rpx;
}

.tab-item text {
  font-size: 24rpx;
  color: #666;
  margin-top: 6rpx;
}

.tab-item.active text {
  color: #1980FF;
}
</style>