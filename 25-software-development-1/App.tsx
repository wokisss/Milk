// 导入 React 库
import React from 'react';
// 导入 react-router-dom 用于前端路由
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 导入认证上下文和保护路由
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// 导入页面和布局组件
import Layout from './components/Layout'; // 主体布局
import Login from './pages/Login'; // 登录页面
import HerdsmanList from './pages/HerdsmanList'; // 牧民信息列表页面
import AcquisitionStats from './pages/AcquisitionStats'; // 收购统计页面
import Announcement from './pages/Announcement'; // 公告页面
import Profile from './pages/Profile'; // 个人中心页面

/**
 * App 组件
 * 
 * 这是应用程序的根组件，负责设置和管理整个应用的路由系统。
 * - 使用 AuthProvider 包裹整个应用，提供全局认证状态。
 * - 区分公共路由（登录页）和受保护路由。
 */
const App: React.FC = () => {
  return (
    // AuthProvider 提供登录、登出和认证状态
    <AuthProvider>
      <Router>
        <Routes>
          {/* 公共路由：登录页面 */}
          <Route path="/login" element={<Login />} />
          
          {/* 根路径重定向：如果访问根路径，则自动跳转到牧民列表页面 */}
          <Route path="/" element={<Navigate to="/herdsman" replace />} />

          {/* 
            受保护的路由组：
            - 使用 <ProtectedRoute> 作为包装器。
            - 如果用户未认证，访问这些路径时将被自动重定向到 /login。
            - 如果用户已认证，则会渲染 <Layout> 组件。
          */}
          <Route element={<ProtectedRoute />}>
            {/* 
              Layout 组件包裹所有受保护的页面，提供统一的侧边栏和头部。
              <Outlet> 在 Layout 内部，用于渲染具体的页面组件。
            */}
            <Route element={<Layout />}>
              <Route path="/herdsman" element={<HerdsmanList />} />
              <Route path="/statistics" element={<AcquisitionStats />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;