// 导入 React 相关的钩子和库
import React, { useState } from 'react';
// 导入 react-router-dom 的 useNavigate 钩子，用于编程式导航
import { useNavigate } from 'react-router-dom';
// 导入封装好的 API 服务
import { api } from '../services/api';
// 导入认证上下文钩子
import { useAuth } from '../contexts/AuthContext';

/**
 * Login (登录) 页面组件
 * 
 * - 提供一个用户登录表单。
 * - 处理用户输入、API 请求和登录后的页面跳转。
 * - 使用 AuthContext 来管理全局登录状态。
 */
const Login: React.FC = () => {
  // --- State 管理 ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // --- Hooks ---
  const navigate = useNavigate();
  const { login } = useAuth(); // 从认证上下文中获取 login 函数

  /**
   * 处理登录表单提交的事件。
   * @param e - React 表单事件对象。
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 调用 API 的登录方法，等待返回结果
      const response = await api.login(username, password);
      // 如果 API 返回了 token，则调用上下文的 login 方法
      if (response && response.token) {
        login(response.username, response.token);
        // 登录成功后，跳转到牧民信息页面
        navigate('/herdsman', { replace: true });
      } else {
        // 如果 API 没有返回预期的 token
        alert('登录失败：无效的响应');
      }
    } catch (err) {
      // 如果 API 调用失败，显示一个简单的错误提示
      alert('登录失败，请检查您的用户名和密码');
    } finally {
      // 最终都将加载状态设置回 false
      setLoading(false);
    }
  };

  return (
    // 页面主容器
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")' }} 
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* 登录卡片 */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl w-[400px] overflow-hidden relative z-10 flex flex-col items-center py-10 px-8">
        
        <div className="mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
            <img src="https://img.icons8.com/color/96/000000/cow.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          政府监管子系统
        </h1>
        <h2 className="text-md font-normal text-gray-600 mb-8 text-center">
          欢迎使用红原县“高原智慧牧业”
        </h2>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="请输入账户名称"
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="请输入账户密码"
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-md shadow-lg transition-all mt-4 flex justify-center items-center"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : '登录'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
