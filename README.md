# Light Admin

<div align="center">
  <img alt="Light Admin Logo" width="120" height="120" src="./public/logo.png">
  <h1>Light Admin</h1>
  <p>一个功能强大的可视化后台管理系统</p>
</div>

[![license](https://img.shields.io/github/license/fzlintg/light-admin.svg)](LICENSE) [![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

**中文** | [English](./README.zh-CN.md)

## ✨ 特性

- 🎨 **可视化表单设计器** - 拖拽式表单构建，支持丰富的表单组件
- 🏗️ **组件化架构** - 几乎所有组件都进行了可视化配置
- 📊 **图表集成** - ECharts 模板化配置，支持多种图表类型
- 📋 **表格组件** - VXE Table 强大的表格功能，支持编辑、排序、筛选等
- 🔐 **权限管理** - 完善的角色权限控制系统
- 🌍 **国际化** - 内置多语言支持
- 🎯 **TypeScript** - 完整的类型支持
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🚀 **现代技术栈** - Vue 3 + Vite + TypeScript + Ant Design Vue

## 🎯 核心功能

### 可视化表单设计器

- 拖拽式表单构建
- 丰富的表单组件库（输入框、选择器、日期选择器、文件上传等）
- 实时预览功能
- 表单逻辑配置
- JSON 配置导入导出

### 数据展示

- ECharts 图表组件
- VXE Table 高性能表格
- 数据可视化大屏
- 实时数据更新

### 系统管理

- 用户管理
- 角色权限
- 菜单管理
- 部门管理
- 系统配置

## 🚀 快速开始

### 环境要求

- Node.js >= 18.12.0
- pnpm >= 9.0.2

### 安装

```bash
# 克隆项目
git clone https://github.com/fzlintg/light-admin

# 进入项目目录
cd light-admin

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm serve
```

### 构建

```bash
# 构建生产版本
pnpm build

# 构建测试版本
pnpm build:test

# 构建并分析包大小
pnpm build:analyze
```

## 🐳 Docker 部署

### 构建镜像

```bash
docker build -t light-admin .
```

### 运行容器

```bash
# 使用环境变量指定后端服务地址
docker run --name light-admin -d -p 6666:80 -e VG_BASE_URL=http://localhost:3333 light-admin
```

访问 `http://localhost:6666` 即可使用系统。

## 📁 项目结构

```
light-admin/
├── apps/                    # 应用目录
├── packages/                # 包目录
│   ├── components/          # 通用组件
│   ├── views/              # 视图组件
│   │   └── form-design/    # 表单设计器
│   ├── hooks/              # 组合式函数
│   ├── utils/              # 工具函数
│   ├── store/              # 状态管理
│   └── ...
├── src/                    # 源码目录
│   ├── views/              # 页面视图
│   ├── router/             # 路由配置
│   ├── api/                # API 接口
│   └── ...
├── mock/                   # Mock 数据
└── public/                 # 静态资源
```

## 🛠️ 技术栈

- **前端框架**: Vue 3.4+
- **构建工具**: Vite 5.4+
- **语言**: TypeScript 5.5+
- **UI 组件库**: Ant Design Vue 4.2+
- **状态管理**: Pinia 2.1+
- **路由**: Vue Router 4.4+
- **图表库**: ECharts 5.5+
- **表格组件**: VXE Table
- **CSS 框架**: UnoCSS
- **包管理**: pnpm

## 📖 文档

- [表单设计器使用指南](./docs/form-designer.md)
- [组件开发指南](./docs/component-development.md)
- [部署指南](./docs/deployment.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 更新日志

[CHANGELOG](./CHANGELOG.zh_CN.md)

## 🙏 致谢

本项目基于 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 进行开发，在此基础上进行了大量的修改和扩展，特别是可视化表单设计器功能。

## 📝 许可证

[MIT © lintg_2024](./LICENSE)
