// 导入 React 库
import React from 'react';
// 导入认证上下文钩子
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Header 组件
 * 
 * 位于主布局顶部的页眉。
 * - 从 AuthContext 获取并显示当前用户名。
 * - 提供一个登出按钮，用于结束用户会话。
 */
const Header: React.FC = () => {
  // 从认证上下文中获取用户名和登出函数
  const { username, logout } = useAuth();

  return (
    // 页眉容器
    <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6 z-10 border-b border-gray-200">
      
      {/* 左侧区域，保留用于未来功能（如面包屑） */}
      <div>
        {/* Can add breadcrumbs here */}
      </div>
      
      {/* 右侧区域，包含用户信息和登出按钮 */}
      <div className="flex items-center space-x-4">
        {/* 用户信息显示 */}
        <div className="relative group">
          <div className="flex items-center cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600">
              <i className="fas fa-user-tie"></i>
            </div>
            {/* 从上下文中动态显示用户名，如果不存在则显示 '用户' */}
            <span className="text-sm font-semibold text-gray-700">你好, {username || '用户'}！</span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <i className="fas fa-user-circle w-6 mr-2"></i>
              个人中心
            </Link>
            <button 
              onClick={logout}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              aria-label="登出"
            >
              <i className="fas fa-sign-out-alt w-6 mr-2"></i>
              登出
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
