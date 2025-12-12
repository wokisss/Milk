// 认证辅助工具

// 设置认证令牌
export const setAuthToken = (token = 'mock-token-123456') => {
  localStorage.setItem('token', token)
}

// 获取认证令牌
export const getAuthToken = () => {
  return localStorage.getItem('token')
}

// 清除认证令牌
export const clearAuthToken = () => {
  localStorage.removeItem('token')
}

// 检查是否已认证
export const isAuthenticated = () => {
  return !!getAuthToken()
}



