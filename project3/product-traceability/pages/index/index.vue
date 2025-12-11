<template>
  <view class="splash-screen">
    <view class="content">
      <image class="logo" src="/static/logo.png"></image>
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
      <view>牛奶溯源</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 响应式数据
const title = ref('Hello');
const router = useRouter();

// 页面挂载后执行
onMounted(() => {
  // 3秒后跳转到home页面
  setTimeout(() => {
    router.push('/pages/login/login');
  }, 3000);
});
</script>

<style>
  /* 关键：让启动页容器占满整个屏幕，并禁止滚动 */
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff; /* 或者你想要的任何背景色 */
    overflow: hidden; /* 禁止滚动 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* 这里的高度100vh可以去掉，因为父容器已经居中了 */
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #333;
  }
</style>