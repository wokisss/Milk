// 导入 React 库
import React from 'react';

// 定义 Modal 组件的 props 类型接口
interface ModalProps {
  isOpen: boolean;             // 控制模态框是否可见
  onClose: () => void;         // 关闭模态框时调用的回调函数
  title: string;               // 模态框的标题
  children: React.ReactNode;   // 模态框的主体内容，可以是任何 React 节点
  footer?: React.ReactNode;    // 模态框的页脚内容，可选
  width?: string;              // 模态框的宽度，使用 Tailwind CSS 类，可选
}

/**
 * Modal 组件
 * 
 * 一个通用的、可复用的模态框（对话框）组件。
 * @param {boolean} isOpen - 如果为 true，则显示模态框。
 * @param {function} onClose - 点击关闭按钮或遮罩时触发的函数。
 * @param {string} title - 显示在头部的标题。
 * @param {React.ReactNode} children - 嵌入在模态框主体中的内容。
 * @param {React.ReactNode} [footer] - 显示在底部的操作按钮等内容。
 * @param {string} [width='max-w-lg'] - 控制模态框宽度的 Tailwind CSS 类。
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, width = 'max-w-lg' }) => {
  // 如果 isOpen 为 false，则不渲染任何内容
  if (!isOpen) return null;

  return (
    // 模态框的根元素，它是一个覆盖整个页面的遮罩层
    // - fixed inset-0: 固定定位并铺满整个视口
    // - z-50: 设置一个较高的 z-index 以确保它在最上层
    // - flex items-center justify-center: 使用 Flexbox 将内容居中
    // - bg-black bg-opacity-40: 半透明的黑色背景
    // - backdrop-blur-sm: 添加背景模糊效果，提升视觉层次感
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      
      {/* 模态框的实际内容容器 */}
      <div className={`bg-white rounded-lg shadow-2xl w-full ${width} transform transition-all`}>
        
        {/* 头部区域 */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h3 className="text-gray-700 font-medium">{title}</h3>
          {/* 关闭按钮 */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {/* 主体内容区域 */}
        <div className="p-6 text-gray-600">
          {children}
        </div>
        
        {/* 页脚区域，只有在提供了 footer prop 时才渲染 */}
        {footer && (
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-center space-x-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// 导出 Modal 组件
export default Modal;

