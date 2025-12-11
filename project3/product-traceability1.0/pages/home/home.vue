<template>
  <view class="milk-trace-page">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="menu-btn" @click="openMenu">☰</view>
      
      <!-- 搜索栏 -->
      <view class="search-bar">
        <input 
          type="text" 
          placeholder="搜索溯源信息（如：牦牛牛奶）" 
          class="search-input" 
          v-model="searchKeyword"
          @confirm="handleSearch"
        />
        <view class="search-icon" @click="handleSearch">
          <image src="/static/search.png" mode="aspectFit" class="icon-img" />
        </view>
        <view class="scan-icon" @click="handleScan">
          <image src="/static/scan.png" mode="aspectFit" class="icon-img" />
        </view>
      </view>
      
      <!-- 地区选择 -->
      <view class="location-select" @click="chooseLocation">
        {{ selectedProvince }} ▼
      </view>
    </view>

    <!-- 推荐区域 -->
    <view class="recommend-section">
      <view class="section-title">为你推荐</view>
      
      <!-- 产品网格 -->
      <view class="product-grid">
        <view class="product-card" v-for="(item, index) in products" :key="item.id">
          <!-- 修复：将 image 标签属性写在同一行并正确闭合 -->
          <image :src="`${baseUrl}${item.product_img}`" mode="aspectFill" class="product-img" @error="() => handleImgError(item)" />
          <view class="product-label">{{ item.product_name }}</view>
          <view class="product-province">产地：{{ item.province }}</view>
        </view>
      </view>

      <!-- 状态提示 -->
      <view v-if="loading" class="status-tip">
        <image src="/static/loading.png" mode="aspectFit" class="loading-img" />
        <text class="loading-text">加载中...</text>
      </view>
      <view v-if="products.length === 0 && !loading" class="status-tip">
        <image src="/static/empty.png" mode="aspectFit" class="empty-img" />
        <text class="empty-text">暂无匹配的产品~</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 核心配置
const baseUrl = 'http://localhost:3001';

// 响应式数据
const selectedProvince = ref('四川');
const searchKeyword = ref('');
const products = ref([]);
const loading = ref(false);

// 页面初始化
onMounted(() => {
  fetchProducts();
});

// 获取产品列表
const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await uni.request({
      url: `${baseUrl}/api/products`,
      method: 'GET',
      data: { province: selectedProvince.value },
      timeout: 5000
    });

    if (res.statusCode === 200 && res.data.success) {
      products.value = res.data.data;
    } else {
      uni.showToast({ title: '加载失败', icon: 'error', duration: 1500 });
    }
  } catch (error) {
    console.error('产品加载异常：', error);
    uni.showToast({ title: '网络异常，请重试', icon: 'none', duration: 1500 });
  } finally {
    loading.value = false;
  }
};

// 搜索功能
const handleSearch = async () => {
  const keyword = searchKeyword.value.trim();
  if (!keyword) {
    uni.showToast({ title: '请输入搜索关键词', icon: 'none', duration: 1500 });
    return;
  }

  loading.value = true;
  try {
    const res = await uni.request({
      url: `${baseUrl}/api/products/search`,
      method: 'GET',
      data: { keyword, province: selectedProvince.value },
      timeout: 5000
    });

    if (res.statusCode === 200 && res.data.success) {
      products.value = res.data.data;
    } else {
      uni.showToast({ title: '搜索失败', icon: 'error', duration: 1500 });
    }
  } catch (error) {
    console.error('搜索异常：', error);
    uni.showToast({ title: '网络异常，请重试', icon: 'none', duration: 1500 });
  } finally {
    loading.value = false;
  }
};

// 地区选择
const chooseLocation = () => {
  const provinces = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
    '香港', '澳门'
  ];

  uni.showActionSheet({
    itemList: provinces,
    itemColor: '#1980FF',
    success: (res) => {
      selectedProvince.value = provinces[res.tapIndex];
      fetchProducts();
    }
  });
};

// 图片加载失败容错
const handleImgError = (item) => {
  item.product_img = '/static/img/default.png';
};

// 其他事件
const openMenu = () => {
  uni.showToast({ title: '菜单功能开发中', icon: 'none', duration: 1500 });
};

const handleScan = () => {
  uni.navigateTo({ url: '/pages/scan/scan' })
    .catch(() => {
      uni.showToast({ title: '扫码页面未创建', icon: 'none', duration: 1500 });
    });
};
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, page, .milk-trace-page {
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.milk-trace-page {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  background-color: #1980FF;
  color: #fff;
  padding: 12rpx 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-btn {
  font-size: 32rpx;
  cursor: pointer;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 40rpx;
  padding: 8rpx 16rpx;
  margin: 0 16rpx;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 24rpx;
  color: #333;
  padding: 4rpx 0;
}

.icon-img {
  width: 36rpx;
  height: 36rpx;
}

.scan-icon {
  margin-left: 16rpx;
}

.location-select {
  font-size: 24rpx;
  cursor: pointer;
  padding: 4rpx 8rpx;
}

/* 推荐区域 */
.recommend-section {
  padding: 24rpx 16rpx;
  flex: 1;
  overflow-y: auto;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
  padding-bottom: 8rpx;
  border-bottom: 3rpx solid #1980FF;
  display: inline-block;
}

/* 产品网格布局 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.product-card {
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx;
}

/* 产品图片 */
.product-img {
  width: 100%;
  height: 220rpx;
  border-radius: 8rpx;
  margin-bottom: 16rpx;
}

.product-label {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.product-province {
  font-size: 20rpx;
  color: #999;
}

/* 状态提示 */
.status-tip {
  text-align: center;
  margin-top: 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-img {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 20rpx;
  animation: rotate 1.5s linear infinite;
}

.empty-img {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
  opacity: 0.6;
}

.loading-text {
  font-size: 24rpx;
  color: #1980FF;
}

.empty-text {
  font-size: 24rpx;
  color: #999;
}

/* 加载动画 */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 适配 */
@media (min-width: 750rpx) {
  .product-grid {
    gap: 30rpx;
  }
  .product-img {
    height: 280rpx;
  }
}
</style>