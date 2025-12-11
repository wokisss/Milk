// 导入 React 库
import React from 'react';
// 导入 ReactDOM for DOM 操作，特别是用于渲染 React 组件
import ReactDOM from 'react-dom/client';
// 导入应用程序的根组件 App
import App from './App';

// 从 HTML 中获取 ID 为 'root' 的 DOM 元素
// 这是 React 应用将被挂载的容器
const rootElement = document.getElementById('root');

// 检查 rootElement 是否存在，如果不存在则抛出错误
// 这是一个重要的健壮性检查，确保应用有处可挂载
if (!rootElement) {
  throw new Error("无法找到用于挂载应用的根元素 (Could not find root element to mount to)");
}

// 使用 ReactDOM.createRoot 创建一个新的 React 根
// 这是 React 18 推荐的并发模式 API
const root = ReactDOM.createRoot(rootElement);

// 使用 root.render 方法将 App 组件渲染到 DOM 中
root.render(
  // React.StrictMode 是一个用于突出显示应用程序中潜在问题的工具
  // 它不会渲染任何可见的 UI，但会为其后代元素激活额外的检查和警告
  <React.StrictMode>
    <App />
  </React.StrictMode>
);