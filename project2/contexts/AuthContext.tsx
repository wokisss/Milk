// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义认证上下文将提供的值的类型
interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

// 创建认证上下文，并提供一个默认值
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 定义 AuthProvider 的 props 类型
interface AuthProviderProps {
  children: ReactNode; // children 是 React 节点
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 尝试从 localStorage 获取初始认证状态
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username'));

  // 登录函数
  const login = (newUsername: string, token: string) => {
    localStorage.setItem('token', token); // 将 token 存储在 localStorage
    localStorage.setItem('username', newUsername); // 将用户名存储在 localStorage
    setUsername(newUsername);
    setIsAuthenticated(true);
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('token'); // 从 localStorage 移除 token
    localStorage.removeItem('username'); // 从 localStorage 移除用户名
    setUsername(null);
    setIsAuthenticated(false);
    // 强制跳转到登录页，确保安全
    window.location.href = '/login';
  };

  // 上下文提供的值
  const value = {
    isAuthenticated,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 自定义 Hook，方便组件中使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
