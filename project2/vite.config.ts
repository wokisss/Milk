/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite 配置文件
 * 
 * 使用 defineConfig 工具函数可以获得更好的 TypeScript 类型提示。
 * 这个配置函数接收一个包含 'mode' (如 'development' 或 'production') 的对象。
 */
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    return {
      // 'server' 选项用于配置 Vite 开发服务器
      server: {
        port: 3000, // 指定开发服务器监听的端口号
        host: '0.0.0.0', // 设置为 '0.0.0.0' 使服务器可以从本地网络访问
      },
      // 'plugins' 数组用于配置 Vite 插件
      plugins: [
        react() // 启用 React 插件，提供 React Fast Refresh (HMR) 等功能
      ],
      // 'define' 选项用于在客户端代码中定义全局常量
      // 这在构建时会被静态替换
      define: {
        // 将环境变量 GEMINI_API_KEY 注入到前端代码中，可以通过 process.env.API_KEY 访问
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // 同时保留 GEMINI_API_KEY 的访问方式
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      // 'resolve' 选项用于配置模块解析
      resolve: {
        // 'alias' 用于创建路径别名，简化模块导入
        alias: {
          // 创建一个 '@' 别名，指向项目根目录
          // 这样就可以使用例如 `import Component from '@/components/MyComponent'` 的方式导入
          '@': path.resolve(__dirname, '.'),
        }
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
      },
    };
});
