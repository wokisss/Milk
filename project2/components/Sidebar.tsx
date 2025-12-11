// 导入 React 相关的库和钩子
import React from 'react';
// 导入 react-router-dom 用于路由导航
import { useLocation, Link } from 'react-router-dom';

/**
 * Sidebar 组件
 * 
 * 应用程序的侧边导航栏，提供主要的导航链接。
 */
const Sidebar: React.FC = () => {
  // 使用 useLocation 钩子获取当前的路由位置信息
  const location = useLocation();

  /**
   * 检查给定路径是否为当前活动路径。
   * @param path - 要检查的路径字符串。
   * @returns 如果路径匹配当前页面的 pathname，则返回 true，否则返回 false。
   */
  const isActive = (path: string) => location.pathname.startsWith(path);

  // 定义侧边栏的菜单项数组
  // 每个菜单项包含名称、路由路径和 FontAwesome 图标类名
  const menuItems = [
    { name: '牧民信息', path: '/herdsman', icon: 'fa-users' },
    { name: '收购统计信息', path: '/statistics', icon: 'fa-chart-pie' },
    { name: '发布公告', path: '/announcement', icon: 'fa-bullhorn' },
    { name: '个人中心', path: '/profile', icon: 'fa-user-circle' },
  ];

  return (
    // 侧边栏容器，使用 Tailwind CSS 进行样式设置
    <div className="w-60 bg-blue-800 text-white flex flex-col h-full shadow-lg">
      {/* 侧边栏头部区域，包含 Logo 和系统名称 */}
      <div className="p-5 flex items-center space-x-3 border-b border-blue-700">
        <div className="p-2 rounded-md">
          {/* 使用 FontAwesome 图标 */}
          <i className="fas fa-building-shield text-white text-2xl"></i>
        </div>
        <span className="font-bold text-lg tracking-wider">政府监管子系统</span>
      </div>
      
      {/* 导航链接区域 */}
      <nav className="flex-1 py-4">
        <ul>
          {/* 遍历 menuItems 数组，为每个菜单项生成一个导航链接 */}
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                // 根据链接是否处于活动状态动态设置 CSS 类
                className={`flex items-center px-5 py-3.5 transition-colors duration-200 text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-900' // 活动链接的样式
                    : 'hover:bg-blue-700' // 非活动链接的悬停样式
                }`}
              >
                <i className={`fas ${item.icon} w-6 text-center mr-3 text-lg`}></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// 导出 Sidebar 组件
export default Sidebar;
