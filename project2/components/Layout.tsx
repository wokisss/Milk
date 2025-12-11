// 导入 React 库
import React from 'react';
// 导入 Outlet 组件，它用于在父路由元素中渲染子路由匹配的组件
import { Outlet } from 'react-router-dom';

// 导入组成布局的各个组件
import Sidebar from './Sidebar'; // 侧边栏导航
import Header from './Header';   // 顶部页眉

/**
 * Layout 组件
 * 
 * 这是应用程序的主体布局结构，用于包裹需要共享导航和页眉的页面。
 * 它创建了一个经典的“仪表盘”视图，左侧是固定的侧边栏，右侧是内容区域。
 */
const Layout: React.FC = () => {
  return (
    // 主容器，使用 Flexbox 布局实现左右分栏
    // h-screen: 高度占满整个视口
    // bg-gray-100: 设置浅灰色背景
    // overflow-hidden: 防止内容溢出
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* 侧边栏组件 */}
      <Sidebar />

      {/* 右侧内容区域，同样使用 Flexbox 并设置为 flex-1 以占据剩余空间 */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 顶部页眉组件 */}
        <Header />

        {/* 
          主内容区域
          - flex-1: 占据剩余的垂直空间
          - overflow-auto: 当内容超出时，显示滚动条
        */}
        <main className="flex-1 overflow-auto">
          {/* 
            Outlet 是 react-router v6 的一个关键组件。
            所有在 App.tsx 中嵌套在 Layout 路由下的子路由组件（例如 HerdsmanList, Profile 等）
            都将在此处被渲染。
          */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// 导出 Layout 组件
export default Layout;

