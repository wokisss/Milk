<template>
  <view class="login-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="title">牛奶溯源</view>
    </view>

    <!-- 卡通图标区域 -->
    <view class="icon-container">
      <view class="icon-bg">
        <image src="/static/cartoon-icon.png" class="cartoon-icon" mode="widthFix" />
      </view>
    </view>

    <!-- 表单区域 -->
    <view class="form-container">
      <!-- 名称输入 -->
      <view class="form-item">
        <view class="label">名称</view>
        <input 
          class="input" 
          type="text" 
          placeholder="请输入名称" 
          v-model="formData.name"
        />
      </view>

      <!-- 性别选择：点击文字/圈圈都能取消选中 -->
      <view class="form-item">
        <view class="label">性别</view>
        <view class="radio-group">
          <!-- 男选项：点击文字/圈圈触发 -->
          <label class="radio-label" @click="handleGender('male')">
            <radio 
              value="male" 
              color="#1980FF"
              :checked="formData.gender === 'male'"
              @click.stop="handleGender('male')"
            />
            <text>男</text>
          </label>
          <!-- 女选项：点击文字/圈圈触发 -->
          <label class="radio-label" @click="handleGender('female')">
            <radio 
              value="female" 
              color="#1980FF"
              :checked="formData.gender === 'female'"
              @click.stop="handleGender('female')"
            />
            <text>女</text>
          </label>
        </view>
      </view>

      <!-- 手机号输入 -->
      <view class="form-item">
        <view class="label">手机号</view>
        <input 
          class="input" 
          type="number" 
          placeholder="请输入手机号" 
          v-model="formData.phone"
          maxlength="11"
        />
      </view>
    </view>

    <!-- 错误提示 -->
    <view class="error-tip" v-if="errorMsg">{{ errorMsg }}</view>

    <!-- 登录按钮 -->
    <view class="login-btn" @click="handleLogin">
      登录
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 表单数据
const formData = ref({
  name: '',
  gender: '', // 空=未选择，'male'=男，'female'=女
  phone: ''
});

// 错误提示信息
const errorMsg = ref('');

// 处理性别选择/取消（点击文字/圈圈都触发）
const handleGender = (targetGender) => {
  // 已选中则取消，未选中则切换
  formData.value.gender = formData.value.gender === targetGender ? '' : targetGender;
  // 取消选中后清空错误提示（可选，优化体验）
  if (formData.value.gender) errorMsg.value = '';
};

// 登录处理函数
const handleLogin = () => {
  errorMsg.value = '';

  // 表单校验
  if (!formData.value.name.trim()) {
    errorMsg.value = '请输入名称';
    return;
  }
  // 性别校验：只要gender有值（male/female）就通过
  if (!formData.value.gender) {
    errorMsg.value = '请选择性别';
    return;
  }
  if (!formData.value.phone || formData.value.phone.length !== 11) {
    errorMsg.value = '请输入正确的手机号';
    return;
  }

  // 模拟登录
  uni.showLoading({ title: '正在登录...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '登录成功', icon: 'success' });
    uni.setStorageSync('userInfo', {
      name: formData.value.name,
      gender: formData.value.gender === 'male' ? '男' : '女',
      phone: formData.value.phone
    });
    setTimeout(() => {
      uni.switchTab({ url: '/pages/home/home' });
    }, 1000);
  }, 800);
};
</script>

<style scoped>
/* 页面整体样式 */
.login-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 顶部导航栏 */
.nav-bar {
  height: 88rpx;
  background-color: #1980FF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
}

/* 卡通图标区域 */
.icon-container {
  display: flex;
  justify-content: center;
  padding: 60rpx 0;
}

.icon-bg {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background-color: #ffebee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cartoon-icon {
  width: 120rpx;
  height: 120rpx;
}

/* 表单容器 */
.form-container {
  padding: 0 40rpx;
}

/* 表单项样式 */
.form-item {
  display: flex;
  align-items: center;
  padding: 25rpx 0;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}

/* 第一个表单项圆角 */
.form-item:first-child {
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;
  padding-top: 30rpx;
}

/* 最后一个表单项圆角（无下边框） */
.form-item:last-child {
  border-bottom-left-radius: 12rpx;
  border-bottom-right-radius: 12rpx;
  padding-bottom: 30rpx;
  border-bottom: none;
}

/* 表单项标签 */
.label {
  width: 140rpx;
  font-size: 30rpx;
  color: #333;
}

/* 输入框样式 */
.input {
  flex: 1;
  font-size: 30rpx;
  padding: 5rpx 0;
  color: #333;
}

/* 性别选择容器（横向排列） */
.radio-group {
  flex: 1;
  display: flex;
  gap: 40rpx; /* 男女选项间距 */
}

/* 单选框+文字组合样式（增大点击区域） */
.radio-label {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333;
  cursor: pointer;
  padding: 10rpx 0; /* 增大点击区域 */
}

/* 单选框与文字间距 */
.radio-label text {
  margin-left: 10rpx;
}

/* 错误提示样式 */
.error-tip {
  color: #ff4d4f;
  font-size: 26rpx;
  padding: 0 40rpx 20rpx;
}

/* 登录按钮样式 */
.login-btn {
  width: calc(100% - 80rpx);
  height: 90rpx;
  background-color: #1980FF;
  color: #fff;
  font-size: 32rpx;
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60rpx auto;
  font-weight: 500;
}
</style>