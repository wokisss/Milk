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

      <!-- 性别选择（修复绑定+支持取消） -->
      <view class="form-item">
        <view class="label">性别</view>
        <view class="radio-group">
          <!-- 男选项：点击时切换选中/取消 -->
          <label class="radio-label" @click="toggleGender('male')">
            <radio 
              value="male" 
              color="#1980FF"
              :checked="formData.gender === 'male'"
            />
            <text>男</text>
          </label>
          <!-- 女选项：点击时切换选中/取消 -->
          <label class="radio-label" @click="toggleGender('female')">
            <radio 
              value="female" 
              color="#1980FF"
              :checked="formData.gender === 'female'"
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
import { useRouter } from 'vue-router';

// 表单数据
const formData = ref({
  name: '',
  gender: '', // 空=未选择，'male'=男，'female'=女
  phone: ''
});

// 错误提示信息
const errorMsg = ref('');
const router = useRouter();

// 切换性别（支持选中/取消）
const toggleGender = (gender) => {
  // 若当前已选中，则取消；否则选中
  formData.value.gender = formData.value.gender === gender ? '' : gender;
};

// 登录处理函数
const handleLogin = async () => {
  errorMsg.value = '';
  console.log('当前性别值:', formData.value.gender); // 调试用

  // 表单校验
  if (!formData.value.name.trim()) {
    errorMsg.value = '请输入名称';
    return;
  }
  if (!formData.value.gender) {
    errorMsg.value = '请选择性别';
    return;
  }
  if (!formData.value.phone || formData.value.phone.length !== 11) {
    errorMsg.value = '请输入正确的手机号';
    return;
  }

  // 发起登录请求
  try {
    uni.showLoading({ title: '正在登录...' });
    const res = await uni.request({
      url: 'http://localhost:3001/api/login',
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: formData.value
    });
    uni.hideLoading();

    if (res.statusCode === 200) {
      const { success, message, data } = res.data;
      if (success) {
        uni.showToast({ title: message || '登录成功', icon: 'success' });
        uni.setStorageSync('userInfo', data);
        setTimeout(() => router.push('/pages/my/my'), 1000);
      } else {
        errorMsg.value = message || '登录失败';
      }
    } else {
      errorMsg.value = res.data.message || '服务器错误';
    }
  } catch (error) {
    uni.hideLoading();
    errorMsg.value = '网络请求异常，请检查连接';
    console.error('登录请求失败:', error);
  }
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

/* 单选框+文字组合样式 */
.radio-label {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333;
  cursor: pointer;
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