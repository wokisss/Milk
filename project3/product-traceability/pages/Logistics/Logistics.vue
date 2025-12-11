<template>
  <view class="trace-page">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <view class="title">物流</view>
    </view>

    <!-- 产品信息区域 -->
    <view class="product-info">
      <image src="/static/milk-product.png" class="product-img" mode="aspectFit" />
      <view class="product-name">山东特产 新鲜现摘圆椒青椒</view>
      <view class="product-code">产品编码: 9851 84y9 87n5 1225 487d5</view>
    </view>

    <!-- 物流信息区域 -->
    <view class="logistics-section">
      <view class="logistics-company">
        <view class="company-name">西安德运物流有限公司</view>
        <view class="company-route">山东省菏泽市鄄城县 至 陕西省西安市碑林区</view>
        <view class="company-contact">☎ 13802978945 <view class="more-btn">更多</view></view>
      </view>

      <!-- 物流轨迹 -->
      <view class="logistics-timeline">
        <!-- 到达节点 -->
        <view class="timeline-item">
          <view class="timeline-dot"></view>
          <view class="timeline-content">
            <view class="timeline-title">到达</view>
            <view class="timeline-location">西安市碑林区南关正街50号中贸广场</view>
            <view class="timeline-time">2022-1-23 23:31</view>
            <view class="timeline-status">√ 中途无意外</view>
          </view>
        </view>

        <!-- 中途节点 -->
        <view class="timeline-item">
          <view class="timeline-dot"></view>
          <view class="timeline-content">
            <view class="timeline-title">中途</view>
            <view class="timeline-driver">✓ 王** 卫 司机</view>
            <view class="timeline-car">陕AG***3D53</view>
            <view class="timeline-status">√ 人员正常 车况正常</view>
          </view>
        </view>

        <!-- 发车节点 -->
        <view class="timeline-item">
          <view class="timeline-dot"></view>
          <view class="timeline-content">
            <view class="timeline-title">发车</view>
            <view class="timeline-location">山东省菏泽市鄄城县东祥路3号</view>
            <view class="timeline-time">2022-1-23 10:02</view>
            <view class="timeline-status">√ 验码合格</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';

// 页面加载时可接收产品编码参数
onLoad((options) => {
  console.log('产品编码:', options.productCode);
  // 可在此处调用接口获取真实数据
});

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style scoped>
	/* 关键：禁止浏览器滚动（如需全局禁止） */
	html,
	body {
	  height: 100%;
	  overflow: hidden;
	}
	
/* 页面整体样式 */
.trace-page {
  background-color: #fff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

/* 产品信息区域 */
.product-info {
  padding: 30rpx;
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

/* 物流信息区域 */
.logistics-section {
  padding: 30rpx;
}
.logistics-company {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}
.company-name {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.company-route {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}
.company-contact {
  font-size: 26rpx;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more-btn {
  background-color: #1980FF;
  color: #fff;
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}

/* 物流轨迹时间线 */
.logistics-timeline {
  margin-top: 20rpx;
}
.timeline-item {
  display: flex;
  margin-bottom: 40rpx;
  position: relative;
}
.timeline-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #1980FF;
  margin-right: 20rpx;
  align-self: flex-start;
  margin-top: 6rpx;
}
.timeline-content {
  flex: 1;
}
.timeline-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.timeline-location, .timeline-time, .timeline-driver, .timeline-car {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 6rpx;
}
.timeline-status {
  font-size: 26rpx;
  color: #07c160;
}

/* 时间线连接线 */
.timeline-item:not(:last-child) .timeline-dot {
  position: relative;
}
.timeline-item:not(:last-child) .timeline-dot::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 16rpx;
  bottom: -40rpx;
  width: 2rpx;
  background-color: #e5e5e5;
  transform: translateX(-50%);
}
</style>