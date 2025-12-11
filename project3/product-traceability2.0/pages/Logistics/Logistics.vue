<template>
  <view class="trace-page">
    <!-- 顶部导航 -->
    <view class="nav-bar">
      <view class="title">物流追踪</view>
    </view>

    <scroll-view scroll-y class="content-scroll">
      <!-- 产品信息区域 -->
      <view class="product-info">
        <image src="https://img.icons8.com/color/200/milk-bottle.png" class="product-img" mode="aspectFit" />
        <view class="product-details">
          <view class="product-name">牦牛牛奶 500ml</view>
          <view class="product-code">批次: SC202411001</view>
        </view>
      </view>

      <!-- 地图展示区域 -->
      <view class="map-section">
        <view class="section-title">
          <text>物流轨迹地图</text>
          <text class="refresh-btn" @click="refreshLocation">刷新定位</text>
        </view>
        <map 
          class="logistics-map"
          :latitude="mapCenter.latitude"
          :longitude="mapCenter.longitude"
          :markers="markers"
          :polyline="polyline"
          scale="6"
          show-location
        ></map>
        <view class="map-legend">
          <view class="legend-item">
            <view class="legend-dot start"></view>
            <text>发货地</text>
          </view>
          <view class="legend-item">
            <view class="legend-dot current"></view>
            <text>当前位置</text>
          </view>
          <view class="legend-item">
            <view class="legend-dot end"></view>
            <text>目的地</text>
          </view>
        </view>
      </view>

      <!-- 物流信息区域 -->
      <view class="logistics-section">
        <view class="logistics-company">
          <view class="company-header">
            <image src="https://img.icons8.com/color/48/truck.png" class="company-icon"></image>
            <view class="company-info">
              <view class="company-name">顺丰速运</view>
              <view class="company-route">四川省成都市 → 广东省深圳市</view>
            </view>
          </view>
          <view class="company-contact">
            <text>运单号: SF1234567890</text>
            <view class="call-btn" @click="callDriver">
              <text>📞 联系司机</text>
            </view>
          </view>
        </view>

        <!-- 物流状态 -->
        <view class="logistics-status">
          <view class="status-item">
            <text class="status-label">预计送达</text>
            <text class="status-value">2024-12-02 18:00</text>
          </view>
          <view class="status-item">
            <text class="status-label">运输温度</text>
            <text class="status-value temp-normal">2-8°C ✓</text>
          </view>
        </view>

        <!-- 物流轨迹时间线 -->
        <view class="timeline-section">
          <view class="section-title">物流轨迹</view>
          <view class="logistics-timeline">
            <view 
              class="timeline-item" 
              v-for="(item, index) in logisticsData" 
              :key="index"
              :class="{ active: index === 0 }"
            >
              <view class="timeline-left">
                <view class="timeline-dot"></view>
                <view class="timeline-line" v-if="index < logisticsData.length - 1"></view>
              </view>
              <view class="timeline-content">
                <view class="timeline-header">
                  <text class="timeline-title">{{ item.status }}</text>
                  <text class="timeline-time">{{ item.time }}</text>
                </view>
                <view class="timeline-desc">{{ item.location }}</view>
                <view class="timeline-detail" v-if="item.detail">{{ item.detail }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 地图中心点
const mapCenter = ref({
  latitude: 30.5728,
  longitude: 104.0668
});

// 地图标记点
const markers = ref([
  {
    id: 1,
    latitude: 30.5728,
    longitude: 104.0668,
    title: '发货地-成都',
    iconPath: '/static/marker-start.png',
    width: 30,
    height: 30,
    callout: {
      content: '四川成都',
      display: 'ALWAYS'
    }
  },
  {
    id: 2,
    latitude: 28.2282,
    longitude: 112.9388,
    title: '当前位置-长沙',
    iconPath: '/static/marker-current.png',
    width: 30,
    height: 30,
    callout: {
      content: '当前位置',
      display: 'ALWAYS'
    }
  },
  {
    id: 3,
    latitude: 22.5431,
    longitude: 114.0579,
    title: '目的地-深圳',
    iconPath: '/static/marker-end.png',
    width: 30,
    height: 30,
    callout: {
      content: '深圳',
      display: 'ALWAYS'
    }
  }
]);

// 路线
const polyline = ref([{
  points: [
    { latitude: 30.5728, longitude: 104.0668 },
    { latitude: 29.5647, longitude: 106.5507 },
    { latitude: 28.2282, longitude: 112.9388 },
    { latitude: 22.5431, longitude: 114.0579 }
  ],
  color: '#1980FF',
  width: 4,
  dottedLine: false
}]);

// 物流轨迹数据
const logisticsData = ref([
  {
    status: '运输中',
    time: '2024-11-30 14:30',
    location: '湖南省长沙市岳麓区',
    detail: '快件正在运输中，预计明日送达'
  },
  {
    status: '已发车',
    time: '2024-11-30 08:00',
    location: '重庆市渝北区物流中心',
    detail: '车辆已从重庆中转站发出'
  },
  {
    status: '到达中转站',
    time: '2024-11-29 22:15',
    location: '重庆市渝北区物流中心',
    detail: '快件已到达重庆中转站'
  },
  {
    status: '运输中',
    time: '2024-11-29 10:30',
    location: '四川省成都市武侯区',
    detail: '快件正在运往重庆'
  },
  {
    status: '已揽收',
    time: '2024-11-29 09:00',
    location: '四川省成都市武侯区科华北路',
    detail: '快件已被揽收，温度检测正常：4°C'
  }
]);

// 刷新定位
const refreshLocation = () => {
  uni.showLoading({ title: '刷新中...' });
  // 获取当前位置
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      console.log('当前位置:', res);
      uni.hideLoading();
      uni.showToast({ title: '位置已更新', icon: 'success' });
    },
    fail: (err) => {
      uni.hideLoading();
      console.log('获取位置失败:', err);
      uni.showModal({
        title: '定位授权',
        content: '需要获取您的位置信息，请授权',
        success: (res) => {
          if (res.confirm) {
            uni.openSetting();
          }
        }
      });
    }
  });
};

// 联系司机
const callDriver = () => {
  uni.makePhoneCall({
    phoneNumber: '13800138000',
    fail: () => {
      uni.showToast({ title: '拨打失败', icon: 'none' });
    }
  });
};

onMounted(() => {
  // 请求定位授权
  uni.authorize({
    scope: 'scope.userLocation',
    success: () => {
      console.log('定位授权成功');
    },
    fail: () => {
      console.log('定位授权失败');
    }
  });
});
</script>

<style scoped>
.trace-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.nav-bar {
  height: 88rpx;
  background-color: #1980FF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: #fff;
  font-size: 34rpx;
  font-weight: bold;
}

.content-scroll {
  flex: 1;
}

/* 产品信息 */
.product-info {
  background: #fff;
  padding: 24rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.product-img {
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
}

.product-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.product-code {
  font-size: 24rpx;
  color: #999;
}

/* 地图区域 */
.map-section {
  background: #fff;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.refresh-btn {
  font-size: 24rpx;
  color: #1980FF;
  font-weight: normal;
}

.logistics-map {
  width: 100%;
  height: 400rpx;
  border-radius: 12rpx;
}

.map-legend {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  margin-top: 16rpx;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #666;
}

.legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 8rpx;
}

.legend-dot.start { background: #52c41a; }
.legend-dot.current { background: #1980FF; }
.legend-dot.end { background: #ff4d4f; }

/* 物流信息 */
.logistics-section {
  padding: 0 24rpx 24rpx;
}

.logistics-company {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.company-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.company-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 16rpx;
}

.company-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.company-route {
  font-size: 24rpx;
  color: #666;
  margin-top: 4rpx;
}

.company-contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}

.call-btn {
  background: #1980FF;
  color: #fff;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

/* 物流状态 */
.logistics-status {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.status-item {
  flex: 1;
  text-align: center;
}

.status-label {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.status-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.temp-normal {
  color: #52c41a;
}

/* 时间线 */
.timeline-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.logistics-timeline {
  margin-top: 20rpx;
}

.timeline-item {
  display: flex;
}

.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20rpx;
}

.timeline-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #ddd;
  border: 4rpx solid #fff;
  box-shadow: 0 0 0 4rpx #ddd;
}

.timeline-item.active .timeline-dot {
  background: #1980FF;
  box-shadow: 0 0 0 4rpx rgba(25, 128, 255, 0.2);
}

.timeline-line {
  width: 4rpx;
  flex: 1;
  background: #eee;
  min-height: 60rpx;
}

.timeline-content {
  flex: 1;
  padding-bottom: 30rpx;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.timeline-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.timeline-item.active .timeline-title {
  color: #1980FF;
}

.timeline-time {
  font-size: 24rpx;
  color: #999;
}

.timeline-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.timeline-detail {
  font-size: 24rpx;
  color: #999;
}
</style>
