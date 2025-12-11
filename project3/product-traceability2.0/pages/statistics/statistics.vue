<!-- 报表统计页面 -->
<template>
  <view class="statistics-page">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">数据统计</text>
    </view>

    <!-- 时间筛选 -->
    <view class="time-filter">
      <view 
        v-for="(item, index) in timeOptions" 
        :key="index"
        :class="['time-btn', { active: selectedTimeIndex === index }]"
        @click="selectTime(index)"
      >
        {{ item }}
      </view>
    </view>

    <scroll-view scroll-y class="content-scroll">
      <!-- 核心数据卡片 -->
      <view class="data-cards">
        <view class="data-card">
          <text class="card-value">{{ coreData.scanCount }}</text>
          <text class="card-label">扫码次数</text>
          <text class="card-trend up">↑ 12.5%</text>
        </view>
        <view class="data-card">
          <text class="card-value">{{ coreData.productCount }}</text>
          <text class="card-label">产品数量</text>
          <text class="card-trend up">↑ 8.3%</text>
        </view>
        <view class="data-card">
          <text class="card-value">{{ coreData.warningCount }}</text>
          <text class="card-label">预警数量</text>
          <text class="card-trend down">↓ 5.2%</text>
        </view>
        <view class="data-card">
          <text class="card-value">{{ coreData.userCount }}</text>
          <text class="card-label">用户数量</text>
          <text class="card-trend up">↑ 15.7%</text>
        </view>
      </view>

      <!-- 扫码趋势图表 -->
      <view class="chart-section">
        <view class="section-header">
          <text class="section-title">扫码趋势</text>
        </view>
        <view class="chart-container">
          <!-- 简易柱状图 -->
          <view class="bar-chart">
            <view 
              v-for="(item, index) in chartData" 
              :key="index" 
              class="bar-item"
            >
              <view class="bar" :style="{ height: item.value + '%' }">
                <text class="bar-value">{{ item.count }}</text>
              </view>
              <text class="bar-label">{{ item.label }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 地区分布 -->
      <view class="chart-section">
        <view class="section-header">
          <text class="section-title">地区分布 TOP5</text>
        </view>
        <view class="region-list">
          <view 
            v-for="(item, index) in regionData" 
            :key="index" 
            class="region-item"
          >
            <view class="region-info">
              <text class="region-rank">{{ index + 1 }}</text>
              <text class="region-name">{{ item.name }}</text>
            </view>
            <view class="region-bar-container">
              <view class="region-bar" :style="{ width: item.percent + '%' }"></view>
            </view>
            <text class="region-value">{{ item.count }}</text>
          </view>
        </view>
      </view>

      <!-- 产品类型占比 -->
      <view class="chart-section">
        <view class="section-header">
          <text class="section-title">产品类型占比</text>
        </view>
        <view class="pie-chart">
          <view 
            v-for="(item, index) in productTypeData" 
            :key="index" 
            class="pie-item"
          >
            <view class="pie-color" :style="{ backgroundColor: item.color }"></view>
            <text class="pie-name">{{ item.name }}</text>
            <text class="pie-percent">{{ item.percent }}%</text>
          </view>
        </view>
      </view>

      <!-- 最近扫码记录 -->
      <view class="chart-section">
        <view class="section-header">
          <text class="section-title">最近扫码记录</text>
          <text class="view-all" @click="viewAllRecords">查看全部</text>
        </view>
        <view class="record-list">
          <view 
            v-for="(item, index) in recentRecords" 
            :key="index" 
            class="record-item"
          >
            <view class="record-left">
              <text class="record-product">{{ item.productName }}</text>
              <text class="record-location">{{ item.location }}</text>
            </view>
            <view class="record-right">
              <text class="record-time">{{ item.time }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 时间筛选选项
const timeOptions = ref(['今日', '本周', '本月', '本年']);
const selectedTimeIndex = ref(0);

// 核心数据
const coreData = ref({
  scanCount: '12,580',
  productCount: '856',
  warningCount: '26',
  userCount: '3,420'
});

// 图表数据（模拟7天数据）
const chartData = ref([
  { label: '周一', count: 156, value: 52 },
  { label: '周二', count: 189, value: 63 },
  { label: '周三', count: 245, value: 82 },
  { label: '周四', count: 198, value: 66 },
  { label: '周五', count: 278, value: 93 },
  { label: '周六', count: 300, value: 100 },
  { label: '周日', count: 234, value: 78 }
]);

// 地区分布数据
const regionData = ref([
  { name: '四川省', count: 2580, percent: 100 },
  { name: '内蒙古', count: 1890, percent: 73 },
  { name: '青海省', count: 1456, percent: 56 },
  { name: '新疆', count: 1234, percent: 48 },
  { name: '云南省', count: 986, percent: 38 }
]);

// 产品类型数据
const productTypeData = ref([
  { name: '牦牛牛奶', percent: 35, color: '#1980FF' },
  { name: '有机牛奶', percent: 28, color: '#52c41a' },
  { name: '高原牛奶', percent: 20, color: '#faad14' },
  { name: '草原鲜奶', percent: 12, color: '#ff4d4f' },
  { name: '其他', percent: 5, color: '#999' }
]);

// 最近扫码记录
const recentRecords = ref([
  { productName: '牦牛牛奶 500ml', location: '四川成都', time: '10分钟前' },
  { productName: '有机牛奶 250ml', location: '内蒙古呼和浩特', time: '25分钟前' },
  { productName: '高原牛奶 1L', location: '青海西宁', time: '1小时前' },
  { productName: '草原鲜奶 500ml', location: '新疆乌鲁木齐', time: '2小时前' },
  { productName: '优质鲜奶 250ml', location: '黑龙江哈尔滨', time: '3小时前' }
]);

// 选择时间
const selectTime = (index) => {
  selectedTimeIndex.value = index;
  // 这里可以根据选择的时间段更新数据
};

// 查看全部记录
const viewAllRecords = () => {
  uni.showToast({ title: '查看全部记录', icon: 'none' });
};
</script>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #1980FF;
  padding: 30rpx;
  text-align: center;
}

.title {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
}

/* 时间筛选 */
.time-filter {
  display: flex;
  background: #fff;
  padding: 20rpx;
  gap: 16rpx;
}

.time-btn {
  flex: 1;
  text-align: center;
  padding: 16rpx;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #666;
  background: #f5f5f5;
}

.time-btn.active {
  background: #1980FF;
  color: #fff;
}

.content-scroll {
  flex: 1;
  padding: 20rpx;
}

/* 核心数据卡片 */
.data-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.data-card {
  width: calc(50% - 8rpx);
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.card-value {
  display: block;
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
}

.card-label {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.card-trend {
  display: inline-block;
  font-size: 22rpx;
  margin-top: 8rpx;
  padding: 4rpx 8rpx;
  border-radius: 4rpx;
}

.card-trend.up {
  color: #52c41a;
  background: rgba(82, 196, 26, 0.1);
}

.card-trend.down {
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
}

/* 图表区域 */
.chart-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.view-all {
  font-size: 24rpx;
  color: #1980FF;
}

/* 柱状图 */
.chart-container {
  height: 300rpx;
}

.bar-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 40rpx;
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar {
  width: 40rpx;
  background: linear-gradient(180deg, #1980FF, #40a9ff);
  border-radius: 4rpx 4rpx 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 20rpx;
}

.bar-value {
  font-size: 20rpx;
  color: #fff;
  margin-top: 8rpx;
}

.bar-label {
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
  position: absolute;
  bottom: 0;
}

.bar-item {
  position: relative;
}

/* 地区分布 */
.region-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.region-item {
  display: flex;
  align-items: center;
}

.region-info {
  width: 160rpx;
  display: flex;
  align-items: center;
}

.region-rank {
  width: 40rpx;
  height: 40rpx;
  background: #1980FF;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  margin-right: 12rpx;
}

.region-item:nth-child(1) .region-rank { background: #ff4d4f; }
.region-item:nth-child(2) .region-rank { background: #faad14; }
.region-item:nth-child(3) .region-rank { background: #52c41a; }

.region-name {
  font-size: 26rpx;
  color: #333;
}

.region-bar-container {
  flex: 1;
  height: 16rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
  margin: 0 16rpx;
  overflow: hidden;
}

.region-bar {
  height: 100%;
  background: linear-gradient(90deg, #1980FF, #40a9ff);
  border-radius: 8rpx;
}

.region-value {
  width: 80rpx;
  text-align: right;
  font-size: 26rpx;
  color: #666;
}

/* 产品类型占比 */
.pie-chart {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.pie-item {
  width: calc(50% - 8rpx);
  display: flex;
  align-items: center;
  padding: 12rpx 0;
}

.pie-color {
  width: 24rpx;
  height: 24rpx;
  border-radius: 4rpx;
  margin-right: 12rpx;
}

.pie-name {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.pie-percent {
  font-size: 26rpx;
  color: #666;
  font-weight: 500;
}

/* 扫码记录 */
.record-list {
  display: flex;
  flex-direction: column;
}

.record-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
}

.record-item:last-child {
  border-bottom: none;
}

.record-product {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.record-location {
  font-size: 24rpx;
  color: #999;
}

.record-time {
  font-size: 24rpx;
  color: #999;
}
</style>



