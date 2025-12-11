# 🥛 鲜奶溯源小程序

一款基于微信小程序的奶粉供应链追溯系统，支持消费者扫码查询、物流追踪、串货预警、商品信息展示、报表统计等功能。

## 📱 功能特性

### 核心功能

| 功能模块 | 描述 |
|---------|------|
| 🔍 **扫码查询** | 支持二维码/条形码扫描，快速查询产品溯源信息 |
| 🚚 **物流追踪** | 实时物流轨迹，地图展示运输路线 |
| ⚠️ **串货预警** | 监控异常销售区域，风险等级分类预警 |
| 📊 **报表统计** | 数据可视化，扫码趋势、地区分布、产品占比等 |
| 🏪 **商品信息** | 展示产品详情、加工信息、超市信息 |
| 📍 **定位授权** | 微信定位授权，获取用户位置信息 |

### 页面功能

- ✅ 页面布局清晰
- ✅ 二维码扫描
- ✅ 地图展示
- ✅ 图表展示
- ✅ 数据列表
- ✅ 搜索筛选
- ✅ 分页加载
- ✅ 微信定位授权

## 📁 项目结构

```
product-traceability2.0/
├── pages/                      # 页面目录
│   ├── index/                  # 启动页
│   │   └── index.vue
│   ├── login/                  # 登录页
│   │   └── login.vue
│   ├── home/                   # 首页
│   │   └── home.vue
│   ├── statistics/             # 报表统计页
│   │   └── statistics.vue
│   ├── warning/                # 串货预警页
│   │   └── warning.vue
│   ├── scan/                   # 扫码页
│   │   └── scan.vue
│   ├── select/                 # 溯源信息选择页
│   │   └── select.vue
│   ├── Logistics/              # 物流追踪页
│   │   └── Logistics.vue
│   ├── Supermarket/            # 超市信息页
│   │   └── Supermarket.vue
│   ├── Processing/             # 加工信息页
│   │   └── Processing.vue
│   ├── my/                     # 我的页面
│   │   └── my.vue
│   └── unmy/                   # 未登录我的页面
│       └── unmy.vue
├── static/                     # 静态资源
│   ├── home.png               # 首页图标
│   ├── home-active.png        # 首页选中图标
│   ├── stats.png              # 统计图标
│   ├── stats-active.png       # 统计选中图标
│   ├── warning.png            # 预警图标
│   ├── warning-active.png     # 预警选中图标
│   ├── mine.png               # 我的图标
│   ├── mine-active.png        # 我的选中图标
│   ├── scan.png               # 扫码图标
│   ├── search.png             # 搜索图标
│   └── logo.png               # Logo图片
├── unpackage/                  # 编译输出目录
│   └── dist/
│       └── dev/
│           └── mp-weixin/     # 微信小程序编译文件
├── utils/                      # 工具函数
├── App.vue                     # 应用入口
├── main.js                     # 主入口文件
├── pages.json                  # 页面配置
├── manifest.json               # 应用配置
└── uni.scss                    # 全局样式
```

## 🚀 快速开始

### 环境要求

- [HBuilderX](https://www.dcloud.io/hbuilderx.html) (推荐)
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Node.js 14+

### 安装步骤

#### 方式一：使用 HBuilderX（推荐）

1. 使用 HBuilderX 打开项目目录 `product-traceability2.0`
2. 点击菜单：运行 → 运行到小程序模拟器 → 微信开发者工具
3. 自动编译并打开微信开发者工具

#### 方式二：直接使用微信开发者工具

1. 打开微信开发者工具
2. 导入项目，选择目录：
   ```
   product-traceability2.0/unpackage/dist/dev/mp-weixin
   ```
3. 填写 AppID（可使用测试号）
4. 点击编译运行

### 配置说明

#### 勾选不校验合法域名
在微信开发者工具中：
- 详情 → 本地设置 → 勾选 "不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书检查"

## 📖 页面说明

### 1. 启动页 (index)
- 应用启动展示页
- 3秒后自动跳转到登录页

### 2. 登录页 (login)
- 用户信息填写
- 姓名、性别、手机号
- 表单验证

### 3. 首页 (home)
- 产品列表展示
- 全国省份地区筛选
- 关键词搜索
- 扫码入口

### 4. 报表统计页 (statistics)
- 核心数据卡片
  - 扫码次数
  - 产品数量
  - 预警数量
  - 用户数量
- 扫码趋势柱状图
- 地区分布 TOP5
- 产品类型占比
- 最近扫码记录

### 5. 串货预警页 (warning)
- 预警统计（高/中/低风险）
- 风险等级筛选
- 日期筛选
- 预警列表
- 分页加载更多
- 点击查看详情

### 6. 扫码页 (scan)
- 调用微信扫码 API
- 支持二维码/条形码
- 扫描动画效果
- 手动/自动扫码

### 7. 溯源选择页 (select)
- 显示扫码结果
- 选择查看信息类型
  - 物流信息
  - 超市信息
  - 加工厂信息

### 8. 物流追踪页 (Logistics)
- 产品信息展示
- **地图展示**物流轨迹
- 发货地、当前位置、目的地标记
- 物流公司信息
- 联系司机功能
- 运输温度监控
- 物流时间线

### 9. 超市信息页 (Supermarket)
- 销售超市信息
- 联系方式

### 10. 加工信息页 (Processing)
- 加工厂信息
- 生产批次
- 质检报告

### 11. 我的页面 (my)
- 用户信息展示
- 功能菜单

## 🔧 技术栈

- **框架**: uni-app (Vue 3)
- **UI**: 自定义组件
- **地图**: 微信小程序原生 map 组件
- **扫码**: wx.scanCode API
- **定位**: wx.getLocation API
- **存储**: wx.setStorageSync / wx.getStorageSync

## 📊 TabBar 导航

```
┌─────────────────┬─────────────────┐
│      首页       │      我的       │
└─────────────────┴─────────────────┘
```

> 注：统计和预警功能页面保留，但已从底部导航栏移除，可通过其他方式访问。

## 🎨 主题色

- 主色调: `#1980FF` (蓝色)
- 成功色: `#52c41a` (绿色)
- 警告色: `#faad14` (橙色)
- 危险色: `#ff4d4f` (红色)
- 背景色: `#f5f5f5` (灰色)

## 📝 开发说明

### 添加新页面

1. 在 `pages/` 目录下创建新文件夹和 `.vue` 文件
2. 在 `pages.json` 中注册页面路由
3. 如需添加到 TabBar，在 `pages.json` 的 `tabBar.list` 中配置

### 扫码功能

```javascript
uni.scanCode({
  onlyFromCamera: false,
  scanType: ['qrCode', 'barCode'],
  success: (res) => {
    console.log('扫码结果:', res.result);
  }
});
```

### 定位授权

```javascript
uni.authorize({
  scope: 'scope.userLocation',
  success: () => {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('位置:', res);
      }
    });
  }
});
```

## ⚠️ 注意事项

1. **扫码功能**只能在真机上测试，模拟器无法使用摄像头
2. **地图功能**需要配置合法域名或勾选不校验
3. **定位功能**需要用户授权
4. 真机调试时，包大小不能超过 **4MB**

## 🔄 版本历史

### v2.1.0 (2024-12-04)
- 🔧 简化底部导航栏，仅保留首页和我的
- 🎨 优化项目结构和代码组织
- 📝 更新项目文档

### v2.0.0 (2024-11-30)
- ✨ 新增串货预警功能
- ✨ 新增报表统计功能
- ✨ 新增物流地图展示
- ✨ 新增微信定位授权
- ✨ 新增分页加载功能
- 🎨 优化页面布局和交互
- 🐛 修复扫码功能

### v1.0.0
- 🎉 初始版本发布
- 基础溯源查询功能

## 📄 许可证

MIT License

## 👥 贡献者

欢迎提交 Issue 和 Pull Request！



