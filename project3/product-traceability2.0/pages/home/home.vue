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
      
      <!-- 地区选择 - 使用picker实现全国省份选择 -->
      <picker mode="selector" :range="allProvinces" @change="onProvinceChange">
        <view class="location-select">
          {{ selectedProvince }} ▼
        </view>
      </picker>
    </view>

    <!-- 推荐区域 -->
    <view class="recommend-section">
      <view class="section-title">为你推荐</view>
      
      <!-- 产品网格 -->
      <view class="product-grid">
        <view class="product-card" v-for="(item, index) in filteredProducts" :key="index">
          <image :src="item.product_img" mode="aspectFill" class="product-img" />
          <view class="product-label">{{ item.product_name }}</view>
          <view class="product-province">产地：{{ item.province }}</view>
        </view>
      </view>

      <!-- 无数据提示 -->
      <view v-if="filteredProducts.length === 0" class="status-tip">
        <image src="/static/empty.png" mode="aspectFit" class="empty-img" />
        <text class="empty-text">暂无匹配的产品~</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// --- 新增代码 ---
// 用于存储从API获取的真实产品数据
const products = ref([]);

// onMounted生命周期钩子，在组件加载时执行
onMounted(() => {
  // uni.request发出网络请求
  uni.request({
    url: 'http://localhost:3001/api/product/list',
    method: 'GET',
    success: (res) => {
      // 请求成功后，检查返回的数据是否有效
      if (res.data && res.data.success) {
        // 将获取到的数据赋值给products
        products.value = res.data.data;
      } else {
        // 打印错误信息
        console.error('获取产品列表失败:', res.data.message);
        uni.showToast({
          title: '数据加载失败',
          icon: 'none'
        });
      }
    },
    fail: (err) => {
      // 请求失败时，在控制台打印错误
      console.error('请求API失败:', err);
      uni.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
    }
  });
});
// --- 新增代码结束 ---

// 全国所有省份/地区列表
const allProvinces = ref([
  '全部',
  // 直辖市
  '北京', '天津', '上海', '重庆',
  // 省份
  '河北', '山西', '辽宁', '吉林', '黑龙江',
  '江苏', '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '海南',
  '四川', '贵州', '云南', '陕西', '甘肃', '青海',
  '台湾',
  // 自治区
  '内蒙古', '广西', '西藏', '宁夏', '新疆',
  // 特别行政区
  '香港', '澳门'
]);

// 响应式数据
const selectedProvince = ref('全部');
const searchKeyword = ref('');

// 筛选产品（根据地区+搜索关键词）
const filteredProducts = computed(() => {
  // 修复：从API获取的数据(products)进行筛选，而不是本地假数据
  return products.value.filter(item => {
    // 地区筛选
    const provinceMatch = selectedProvince.value === '全部' || item.province === selectedProvince.value;
    // 关键词筛选
    const keywordMatch = item.product_name.includes(searchKeyword.value.trim());
    return provinceMatch && keywordMatch;
  });
});

// 搜索功能
const handleSearch = () => {
  // 依赖computed自动筛选，无需额外逻辑
};

// 省份选择变更
const onProvinceChange = (e) => {
  const index = e.detail.value;
  selectedProvince.value = allProvinces.value[index];
};

// 图片加载失败容错（可选）
const handleImgError = (item) => {
  item.product_img = '/static/img/default.png';
};

// 其他事件
const openMenu = () => {
  uni.showToast({ title: '菜单功能开发中', icon: 'none', duration: 1500 });
};

// 扫码功能：跳转到 scan.vue 页面
const handleScan = () => {
  // 跳转页面（确保 scan.vue 的路径正确，根据你的项目结构调整）
  uni.navigateTo({
    url: '/pages/scan/scan' // 路径格式：/pages/文件夹名称/页面名称
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

.empty-img {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
  opacity: 0.6;
}

.empty-text {
  font-size: 24rpx;
  color: #999;
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