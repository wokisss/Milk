<template>
  <view class="mine-page">
    <!-- 顶部导航栏 -->
    <view class="header">个人信息</view>

    <!-- 头像区域 -->
    <view class="avatar-section">
      <view class="avatar-wrap">
        <image src="https://via.placeholder.com/120x120?text=头像" mode="aspectFill" class="avatar" />
      </view>
    </view>

    <!-- 表单区域 -->
    <view class="form-section">
      <view class="form-item">
        <view class="label">名称</view>
        <input type="text" placeholder="请输入名称" class="input" v-model="form.name" />
      </view>
      
      <!-- 性别选择 - 修改后 -->
      <view class="form-item gender-item">
        <view class="label">性别</view>
        <radio-group class="gender-options" v-model="form.gender">
          <label class="radio-label">
            <radio value="male" /> 男
          </label>
          <label class="radio-label">
            <radio value="female" /> 女
          </label>
        </radio-group>
      </view>
      
      <view class="form-item">
        <view class="label">手机号</view>
        <input type="number" placeholder="请输入手机号" class="input" v-model="form.phone" />
      </view>
    </view>

    <!-- 提示文本 -->
    <view class="tip-text">
      根据未成年人保护相关法律法规的要求，我们不主动处理14周岁以下未成年人的个人信息。如果您为14周岁以下的用户，请勿填写您的个人资料。
    </view>

    <!-- 保存按钮 -->
    <view class="save-btn" @click="handleSave">保存</view>

  </view>
</template>

<script setup>
import { ref } from 'vue';

// 表单数据 - 初始化性别为空
const form = ref({
  name: '',
  gender: '', // 空表示未选择
  phone: ''
});

// 清除性别选择
const clearGender = () => {
  form.value.gender = '';
};

// 保存按钮事件
const handleSave = () => {
  console.log('保存的数据:', form.value);
  uni.showToast({ title: '保存成功', icon: 'success' });
};
</script>

<style scoped>
/* 原有样式不变，新增清除按钮样式 */
page {
	  overflow: hidden;
	  height: 100%;
	}
.gender-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gender-options {
  display: flex;
  flex: 1;
}

.clear-btn {
  color: #1980FF;
  font-size: 26rpx;
  margin-left: 20rpx;
}

/* 其他原有样式保持不变 */
.mine-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #1980FF;
  color: #fff;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
  font-weight: bold;
}

.avatar-section {
  background-color: #fff;
  padding: 40rpx 0;
  display: flex;
  justify-content: center;
  margin-bottom: 20rpx;
}

.avatar-wrap {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  background-color: #ffe4e1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.form-section {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid #eee;
}

.form-item:last-child {
  border-bottom: none;
}

.label {
  width: 120rpx;
  color: #666;
  font-size: 28rpx;
}

.input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
}

.radio-label {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
  font-size: 28rpx;
}

.tip-text {
  padding: 20rpx;
  font-size: 24rpx;
  color: #999;
  line-height: 1.5;
  margin-bottom: 40rpx;
}

.save-btn {
  background-color: #1980FF;
  color: #fff;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 32rpx;
  border-radius: 10rpx;
  margin: 0 20rpx 40rpx;
}
</style>