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
      <picker 
        mode="selector" 
        :range="provinces" 
        :value="provinceIndex" 
        @change="onProvinceChange"
        class="location-picker"
      >
        <view class="location-select" hover-class="location-hover">
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
          <image :src="item.product_img" mode="aspectFill" class="product-img" @error="handleImgError(item)" />
          <view class="product-label">{{ item.product_name }}</view>
          <view class="product-province">产地：{{ item.province }}</view>
        </view>
      </view>

      <!-- 无数据提示 -->
      <view v-if="filteredProducts.length === 0" class="status-tip">
        <image src="/static/img/empty.png" mode="aspectFit" class="empty-img" />
        <text class="empty-text">暂无匹配的产品~</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

// 所有省份列表
const provinces = ref([
  '全部', '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南',
  '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海',
  '宁夏', '新疆', '台湾', '香港', '澳门'
]);

// 产品数据，初始为空数组
const localProducts = ref([]);

// 获取产品数据的函数
const fetchProducts = () => {
  uni.showLoading({ title: '加载中...' });
  uni.request({
    url: 'http://localhost:3001/api/product/list',
    method: 'GET',
    success: (res) => {
      if (res.data.success) {
        localProducts.value = res.data.data;
      } else {
        uni.showToast({ title: res.data.message || '获取产品失败', icon: 'none' });
      }
    },
    fail: (err) => {
      uni.showToast({ title: '网络请求失败', icon: 'none' });
      console.error(err);
    },
    complete: () => {
        uni.hideLoading();
    }
  });
};

// 在页面显示时调用 fetchProducts
onShow(() => {
  fetchProducts();
});


// 响应式数据
const provinceIndex = ref(0); // 默认“全部”
const selectedProvince = ref('全部');
const searchKeyword = ref('');

// 筛选产品
const filteredProducts = computed(() => {
  return localProducts.value.filter(item => {
    const provinceMatch = selectedProvince.value === '全部' || (item.province && item.province.trim() === selectedProvince.value.trim());
    const keywordMatch = item.product_name.toLowerCase().includes(searchKeyword.value.trim().toLowerCase());
    return provinceMatch && keywordMatch;
  });
});

// 省份选择变化
const onProvinceChange = (e) => {
  const index = e.detail.value;
  provinceIndex.value = index;
  selectedProvince.value = provinces.value[index];
};

// 搜索功能
const handleSearch = () => {
  // 搜索逻辑已通过 computed 属性实现，此函数可用于触发提示
  uni.showToast({ title: `开始在"${selectedProvince.value}"搜索`, icon: 'none' });
};

// 图片加载失败容错
const handleImgError = (item) => {
  item.product_img = `https://via.placeholder.com/200x220?text=${item.product_name}`;
};

// 菜单功能
const openMenu = () => {
  uni.showToast({ title: '菜单开发中', icon: 'none' });
};

// 扫码跳转
const handleScan = () => {
  uni.navigateTo({
    url: '/pages/scan/scan',
    fail: () => uni.showToast({ title: '跳转扫码页失败', icon: 'none' })
  });
};
</script>

<style scoped>
/* 基础样式 */
.milk-trace-page, html, body, page {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
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
  flex-wrap: nowrap;
}

.menu-btn {
  font-size: 32rpx;
  cursor: pointer;
  padding: 8rpx;
  width: 48rpx;
  text-align: center;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 40rpx;
  padding: 8rpx 16rpx;
  margin: 0 16rpx;
  min-width: 250rpx;
  white-space: nowrap;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 24rpx;
  color: #333;
  padding: 4rpx 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-img {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.search-icon {
  flex-shrink: 0;
}

.scan-icon {
  margin-left: 16rpx;
  flex-shrink: 0;
}

.location-picker {
  width: auto;
  min-width: 120rpx;
  flex-shrink: 0;
}

.location-select {
  font-size: 24rpx;
  cursor: pointer;
  padding: 8rpx 12rpx;
  border-radius: 8rpx;
}

.location-hover {
  background-color: rgba(255, 255, 255, 0.2);
}

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

.product-img {
  width: 100%;
  height: 220rpx;
  border-radius: 8rpx;
  margin-bottom: 16rpx;
  background-color: #f5f5f5;
}

.product-label {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
  text-align: center;
}

.product-province {
  font-size: 20rpx;
  color: #999;
}

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
</style>
