<!-- 串货预警页面 -->
<template>
  <view class="warning-page">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">串货预警</text>
    </view>

    <!-- 预警统计卡片 -->
    <view class="stats-cards">
      <view class="stat-card danger">
        <text class="stat-number">{{ warningStats.high }}</text>
        <text class="stat-label">高风险</text>
      </view>
      <view class="stat-card warning">
        <text class="stat-number">{{ warningStats.medium }}</text>
        <text class="stat-label">中风险</text>
      </view>
      <view class="stat-card safe">
        <text class="stat-number">{{ warningStats.low }}</text>
        <text class="stat-label">低风险</text>
      </view>
    </view>

    <!-- 筛选区域 -->
    <view class="filter-section">
      <picker mode="selector" :range="riskLevels" @change="onRiskChange">
        <view class="filter-btn">
          <text>{{ selectedRisk }}</text>
          <text class="arrow">▼</text>
        </view>
      </picker>
      <picker mode="date" @change="onDateChange">
        <view class="filter-btn">
          <text>{{ selectedDate || '选择日期' }}</text>
          <text class="arrow">▼</text>
        </view>
      </picker>
    </view>

    <!-- 预警列表 -->
    <scroll-view scroll-y class="warning-list" @scrolltolower="loadMore">
      <view class="warning-item" v-for="(item, index) in filteredWarnings" :key="index" @click="showDetail(item)">
        <view class="warning-header">
          <view :class="['risk-tag', item.riskLevel]">
            {{ item.riskLevel === 'high' ? '高风险' : item.riskLevel === 'medium' ? '中风险' : '低风险' }}
          </view>
          <text class="warning-time">{{ item.time }}</text>
        </view>
        <view class="warning-content">
          <text class="product-name">{{ item.productName }}</text>
          <text class="warning-desc">{{ item.description }}</text>
        </view>
        <view class="warning-footer">
          <text class="location">📍 {{ item.location }}</text>
          <text class="batch">批次: {{ item.batchNo }}</text>
        </view>
      </view>

      <!-- 加载更多 -->
      <view class="load-more" v-if="hasMore">
        <text>加载更多...</text>
      </view>
      <view class="no-more" v-else-if="filteredWarnings.length > 0">
        <text>没有更多数据了</text>
      </view>
      <view class="empty" v-else>
        <text>暂无预警信息</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

// 预警统计
const warningStats = ref({
  high: 3,
  medium: 8,
  low: 15
});

// 风险等级选项
const riskLevels = ref(['全部', '高风险', '中风险', '低风险']);
const selectedRiskIndex = ref(0);
const selectedRisk = computed(() => riskLevels.value[selectedRiskIndex.value]);
const selectedDate = ref('');

// 分页相关
const currentPage = ref(1);
const pageSize = 10;
const hasMore = ref(true);

// 预警数据
const warningList = ref([
  {
    id: 1,
    productName: '牦牛牛奶 500ml',
    batchNo: 'SC202411001',
    riskLevel: 'high',
    description: '该批次产品在非授权区域销售，疑似串货',
    location: '广东省深圳市',
    expectedLocation: '四川省成都市',
    time: '2024-11-30 14:30'
  },
  {
    id: 2,
    productName: '有机牛奶 250ml',
    batchNo: 'SC202411002',
    riskLevel: 'medium',
    description: '销售渠道异常，需进一步核实',
    location: '浙江省杭州市',
    expectedLocation: '内蒙古呼和浩特',
    time: '2024-11-30 12:15'
  },
  {
    id: 3,
    productName: '高原牛奶 1L',
    batchNo: 'SC202411003',
    riskLevel: 'low',
    description: '跨区域销售记录，已核实为正常调货',
    location: '上海市浦东新区',
    expectedLocation: '青海省西宁市',
    time: '2024-11-29 18:45'
  },
  {
    id: 4,
    productName: '草原鲜奶 500ml',
    batchNo: 'SC202411004',
    riskLevel: 'high',
    description: '多个非授权经销商同时销售同批次产品',
    location: '江苏省南京市',
    expectedLocation: '新疆乌鲁木齐',
    time: '2024-11-29 10:20'
  },
  {
    id: 5,
    productName: '优质鲜奶 250ml',
    batchNo: 'SC202411005',
    riskLevel: 'medium',
    description: '价格异常波动，可能存在窜货行为',
    location: '北京市朝阳区',
    expectedLocation: '黑龙江哈尔滨',
    time: '2024-11-28 16:30'
  }
]);

// 筛选后的预警列表
const filteredWarnings = computed(() => {
  let result = warningList.value;
  
  // 按风险等级筛选
  if (selectedRiskIndex.value > 0) {
    const levelMap = { 1: 'high', 2: 'medium', 3: 'low' };
    result = result.filter(item => item.riskLevel === levelMap[selectedRiskIndex.value]);
  }
  
  // 按日期筛选
  if (selectedDate.value) {
    result = result.filter(item => item.time.startsWith(selectedDate.value));
  }
  
  return result;
});

// 风险等级变更
const onRiskChange = (e) => {
  selectedRiskIndex.value = e.detail.value;
};

// 日期变更
const onDateChange = (e) => {
  selectedDate.value = e.detail.value;
};

// 加载更多
const loadMore = () => {
  if (!hasMore.value) return;
  // 模拟加载更多
  setTimeout(() => {
    hasMore.value = false;
  }, 1000);
};

// 查看详情
const showDetail = (item) => {
  uni.showModal({
    title: '串货预警详情',
    content: `产品: ${item.productName}\n批次: ${item.batchNo}\n预期销售区域: ${item.expectedLocation}\n实际销售区域: ${item.location}\n\n${item.description}`,
    showCancel: false
  });
};
</script>

<style scoped>
.warning-page {
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

/* 统计卡片 */
.stats-cards {
  display: flex;
  padding: 20rpx;
  gap: 20rpx;
}

.stat-card {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.stat-card.danger { border-top: 6rpx solid #ff4d4f; }
.stat-card.warning { border-top: 6rpx solid #faad14; }
.stat-card.safe { border-top: 6rpx solid #52c41a; }

.stat-number {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

/* 筛选区域 */
.filter-section {
  display: flex;
  padding: 20rpx;
  gap: 20rpx;
}

.filter-btn {
  flex: 1;
  background: #fff;
  padding: 20rpx 24rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}

.arrow {
  color: #999;
  font-size: 24rpx;
}

/* 预警列表 */
.warning-list {
  flex: 1;
  padding: 0 20rpx 20rpx;
}

.warning-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.warning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.risk-tag {
  padding: 6rpx 16rpx;
  border-radius: 6rpx;
  font-size: 24rpx;
  color: #fff;
}

.risk-tag.high { background-color: #ff4d4f; }
.risk-tag.medium { background-color: #faad14; }
.risk-tag.low { background-color: #52c41a; }

.warning-time {
  font-size: 24rpx;
  color: #999;
}

.warning-content {
  margin-bottom: 16rpx;
}

.product-name {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 8rpx;
}

.warning-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.warning-footer {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #999;
}

/* 加载状态 */
.load-more, .no-more, .empty {
  text-align: center;
  padding: 30rpx;
  color: #999;
  font-size: 26rpx;
}
</style>



