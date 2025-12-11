<template>
  <view class="my-page">
    <!-- 个人信息卡片：仅保留头像+登录后信息，靠左对齐 -->
    <view class="user-card">
      <view class="avatar-container">
        <image 
          src="https://via.placeholder.com/100x100?text=头像" 
          class="avatar" 
          mode="aspectFit"
        />
      </view>
      <!-- 姓名和手机号靠左对齐，无额外文字 -->
      <view class="user-info">
        <view class="user-name">{{ userInfo.name || '未登录' }}</view>
        <view class="user-phone" v-if="userInfo.phone">{{ userInfo.phone }}</view>
      </view>
    </view>

    <!-- 表单区域（含性别选择，适配微信小程序） -->
    <view class="form-container">
      <view class="form-title">个人资料编辑</view>

      <!-- 姓名输入 -->
      <view class="form-item">
        <view class="label">姓名</view>
        <input 
          class="input" 
          type="text" 
          v-model="form.name" 
          placeholder="请输入姓名"
        />
      </view>

      <!-- 性别选择（微信小程序兼容写法） -->
      <view class="form-item gender-item">
        <view class="label">性别</view>
        <radio-group class="gender-options" @change="handleGenderChange">
          <label class="radio-label">
            <radio value="male" :checked="form.gender === 'male'" color="#1980FF" /> 男
          </label>
          <label class="radio-label">
            <radio value="female" :checked="form.gender === 'female'" color="#1980FF" /> 女
          </label>
        </radio-group>
      </view>

      <!-- 手机号输入 -->
      <view class="form-item">
        <view class="label">手机号</view>
        <input 
          class="input" 
          type="number" 
          v-model="form.phone" 
          placeholder="请输入手机号"
          maxlength="11"
        />
      </view>

      <!-- 保存按钮 -->
      <view class="save-btn" @click="handleSave">
        保存信息
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// 登录用户信息（纯本地存储，与登录页同步字段）
const userInfo = ref({
  name: '',
  gender: '', // 存储文本：'男'/'女'/'未选择'
  phone: ''
});

// 表单数据（用于编辑，与存储字段映射）
const form = ref({
  name: '',
  gender: '', // 存储值：'male'/'female'/'': 与radio值对应
  phone: ''
});

// 页面加载时，从本地存储读取信息（关键：与登录页存储的key和字段一致）
onMounted(() => {
  // 读取登录时存储的用户信息（登录页需用同样的key：'userInfo'）
  const storedUser = uni.getStorageSync('userInfo');
  if (storedUser && storedUser.phone) { // 有手机号视为已登录
    userInfo.value = {
      name: storedUser.name || '',
      gender: storedUser.gender || '未选择',
      phone: storedUser.phone || ''
    };

    // 初始化表单：将存储的文本（'男'/'女'）映射为radio的value（'male'/'female'）
    form.value = {
      name: storedUser.name || '',
      gender: storedUser.gender === '男' ? 'male' : storedUser.gender === '女' ? 'female' : '',
      phone: storedUser.phone || ''
    };
  } else {
    // 未登录：跳转登录页（可选，根据需求是否强制登录）
    uni.navigateTo({ url: '/pages/login/login' });
  }
});

// 监听性别选择变化（微信小程序兼容）
const handleGenderChange = (e) => {
  form.value.gender = e.detail.value;
};

// 保存个人信息（更新本地存储，覆盖旧数据）
const handleSave = () => {
  // 表单校验
  if (!form.value.name.trim()) {
    uni.showToast({ title: '请输入姓名', icon: 'none', duration: 1500 });
    return;
  }
  if (!form.value.phone || form.value.phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none', duration: 1500 });
    return;
  }

  // 转换性别：表单value（'male'/'female'）→ 存储文本（'男'/'女'）
  const genderText = form.value.gender === 'male' ? '男' : form.value.gender === 'female' ? '女' : '未选择';

  // 更新用户信息（最新修改的内容）
  const updatedUser = {
    name: form.value.name.trim(),
    gender: genderText,
    phone: form.value.phone
  };

  // 同步到本地存储（覆盖登录时的旧数据）
  userInfo.value = updatedUser;
  uni.setStorageSync('userInfo', updatedUser);

  // 提示保存成功
  uni.showToast({ title: '信息保存成功', icon: 'success', duration: 1500 });
};
</script>

<style scoped>
/* 页面整体样式：禁用滑动，固定高度 */
.my-page {
  background-color: #f5f5f5;
  height: 100vh; /* 固定页面高度，不滚动 */
  overflow: hidden; /* 禁用滚动（替代小程序不支持的 DOM 操作） */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-bottom: 30rpx; /* 底部预留空间 */
}

/* 个人信息卡片：靠左对齐，移除居中 */
.user-card {
  background-color: #fff;
  padding: 40rpx 30rpx;
  display: flex;
  align-items: center;
  margin: 0;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.avatar-container {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 30rpx;
  background-color: #eee;
  border: 4rpx solid #f0f0f0; /* 优化头像边框 */
}

.avatar {
  width: 100%;
  height: 100%;
}

/* 登录后信息：靠左对齐，简洁样式 */
.user-info {
  text-align: left;
}

.user-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 10rpx;
}

.user-phone {
  font-size: 26rpx;
  color: #666;
}

/* 表单容器：紧凑布局，避免滚动 */
.form-container {
  background-color: #fff;
  padding: 0 30rpx 30rpx;
  margin: 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 24rpx;
}

/* 表单项样式 */
.form-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #eee;
}

.form-item:last-child {
  border-bottom: none;
}

.label {
  width: 120rpx;
  font-size: 26rpx;
  color: #333;
}

.input {
  flex: 1;
  font-size: 26rpx;
  color: #333;
  padding: 8rpx 0;
}

/* 性别选择样式 */
.gender-item {
  align-items: center;
}

.gender-options {
  flex: 1;
  display: flex;
  gap: 60rpx;
  align-items: center;
}

.radio-label {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #333;
  cursor: pointer;
}

.radio-label radio {
  margin-right: 12rpx;
}

/* 保存按钮：优化位置，避免底部溢出 */
.save-btn {
  margin-top: 30rpx;
  height: 90rpx;
  background-color: #1980FF;
  color: #fff;
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: 500;
}
</style>