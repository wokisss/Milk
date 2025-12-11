<template>
  <view class="factory-page">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <view class="title">牛奶溯源</view>
    </view>

    <!-- 滚动容器：整个页面内容超出时外层滑动 -->
    <view class="outer-scroll">
      <!-- 产品信息区域 -->
      <view class="product-info">
        <image src="https://img.icons8.com/color/200/milk-bottle.png" class="product-img" mode="aspectFit" />
        <view class="product-name">山东特产 新鲜现摘圆椒青椒</view>
        <view class="product-code">产品编码: 9851 84y9 87n5 1225 487d5</view>
      </view>

      <!-- 加工厂信息区域 -->
      <view class="factory-info">
        <view class="factory-name">鄄城县蔬菜加工基地</view>
        <view class="factory-address">山东省菏泽市鄄城县东祥路3号</view>
        <view class="factory-contact">☎ 18178945324</view>
      </view>

      <!-- 流程信息区域（无内层滚动，由外层统一控制） -->
      <view class="process-section">
        <!-- 出库节点 -->
        <view class="process-item">
          <view class="process-dot"></view>
          <view class="process-content">
            <view class="process-title">出库</view>
            <view class="process-staff">王** 库管</view>
            <view class="process-time">2022-1-23 8:44</view>
            <view class="process-status">√ 验码合格</view>
          </view>
        </view>

        <!-- 入库节点 -->
        <view class="process-item">
          <view class="process-dot"></view>
          <view class="process-content">
            <view class="process-title">入库</view>
            <view class="process-staff">王** 库管</view>
            <view class="process-time">2022-1-23 8:01</view>
            <view class="process-status">√ 验码合格</view>
          </view>
        </view>

        <!-- 质检检测节点 -->
        <view class="process-item">
          <view class="process-dot"></view>
          <view class="process-content">
            <view class="process-title">质量检测</view>
            <view class="process-staff">张** 质检员</view>
            <view class="process-time">2022-1-23 8:00</view>
            <view class="process-status">√ 验码合格 质检合格</view>
          </view>
        </view>

        <!-- 加工包装节点 -->
        <view class="process-item">
          <view class="process-dot"></view>
          <view class="process-content">
            <view class="process-title">加工 包装</view>
            <view class="process-desc">除杆, 清洗, 封膜包装</view>
            <view class="process-staff">张* 工人</view>
            <view class="process-time">2022-1-23 7:19</view>
            <view class="process-status">√ 验码合格 人员正常 设备正常</view>
          </view>
        </view>

        <!-- 入库节点 -->
        <view class="process-item">
          <view class="process-dot"></view>
          <view class="process-content">
            <view class="process-title">入库</view>
            <view class="process-staff">张* 工人</view>
            <view class="process-time">2022-1-23 8:15</view>
            <view class="process-status">√ 验码合格</view>
          </view>
        </view>

        <!-- 运输节点 -->
        <view class="process-item">
          <view class="process-dot"></view>
          <view class="process-content">
            <view class="process-title">运输</view>
            <view class="process-staff">王** 司机</view>
            <view class="process-car">鲁P23***2D2</view>
            <view class="process-time">2022-1-23 6:42</view>
            <view class="process-status">√ 验码合格 人员正常 车况正常</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style>
  /* 关键：禁止浏览器滚动（如需全局禁止） */
  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  /* 页面整体样式 */
  .factory-page {
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    height: 100vh; /* 页面高度撑满屏幕 */
  }

  /* 顶部导航 */
  .nav-bar {
    display: flex;
    align-items: center;
    height: 88rpx;
    background-color: #1980FF;
    color: #fff;
    padding: 0 20rpx;
  }
  .back-btn {
    font-size: 32rpx;
    margin-right: 20rpx;
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    font-weight: bold;
  }

  /* 外层滚动容器：整个页面内容超出时滑动，隐藏内层滚动条 */
  .outer-scroll {
    overflow-y: auto; /* 外层统一滚动 */
    height: calc(100vh - 88rpx); /* 高度 = 屏幕高度 - 导航栏高度 */
    box-sizing: border-box;
    padding: 0 30rpx;
  }

  /* 产品信息区域 */
  .product-info {
    padding: 30rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
  }
  .product-img {
    width: 160rpx;
    height: 120rpx;
    margin-bottom: 20rpx;
  }
  .product-name {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  .product-code {
    font-size: 26rpx;
    color: #666;
  }

  /* 加工厂信息区域 */
  .factory-info {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  }
  .factory-name {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  .factory-address {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 10rpx;
  }
  .factory-contact {
    font-size: 26rpx;
    color: #666;
  }

  /* 流程信息区域 */
  .process-section {
    width: 100%;
  }
  .process-item {
    display: flex;
    margin-bottom: 40rpx;
    position: relative;
  }
  .process-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: #1980FF;
    margin-right: 20rpx;
    align-self: flex-start;
    margin-top: 6rpx;
  }
  .process-content {
    flex: 1;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  }
  .process-title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  .process-staff, .process-time, .process-desc {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 6rpx;
  }
  .process-status {
    font-size: 26rpx;
    color: #07c160;
  }

  /* 时间线连接线 */
  .process-item:not(:last-child) .process-dot {
    position: relative;
  }
  .process-item:not(:last-child) .process-dot::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 16rpx;
    bottom: -40rpx;
    width: 2rpx;
    background-color: #e5e5e5;
    transform: translateX(-50%);
  }

  /* 隐藏滚动条（可选，根据需求调整） */
  ::-webkit-scrollbar {
    width: 0; /* 隐藏滚动条宽度 */
    height: 0;
  }
</style>