# Light Admin

<div align="center">
  <img alt="Light Admin Logo" width="120" height="120" src="./public/logo.png">
  <h1>Light Admin</h1>
  <p>一个功能强大的可视化后台管理系统</p>
</div>

[![license](https://img.shields.io/github/license/fzlintg/light-admin.svg)](LICENSE) [![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

**中文** | [English](./README.md)

## 📖 简介

Light Admin 是一个功能强大的可视化后台管理系统，基于 Vue 3 + Vite + TypeScript 构建。项目在 vue-vben-admin 基础上进行了大量的修改和扩展，特别是可视化表单设计器功能，为开发者提供了一个开箱即用的中后台前端解决方案。

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
- 🎭 **主题定制** - 可配置的主题系统
- 📦 **Mock 数据** - 内置 Mock 数据方案

## 🎯 核心功能

### 🎨 可视化表单设计器

- **拖拽式构建**: 通过拖拽方式快速构建表单
- **丰富组件库**: 输入框、选择器、日期选择器、文件上传、图表等
- **实时预览**: 所见即所得的表单预览
- **逻辑配置**: 支持表单字段间的逻辑关联
- **JSON 配置**: 支持配置的导入导出
- **自定义组件**: 支持扩展自定义表单组件

### 📊 数据展示

- **ECharts 集成**: 支持柱状图、折线图、饼图、地图等多种图表
- **VXE Table**: 高性能表格组件，支持虚拟滚动、编辑、排序、筛选
- **数据大屏**: 支持数据可视化大屏展示
- **实时更新**: 支持数据的实时更新和展示

### 🔐 系统管理

- **用户管理**: 用户信息的增删改查
- **角色权限**: 基于角色的权限控制系统
- **菜单管理**: 动态菜单配置
- **部门管理**: 组织架构管理
- **系统配置**: 系统参数配置

### 🛠️ 开发工具

- **代码编辑器**: 集成 CodeMirror 代码编辑器
- **Markdown 编辑器**: 支持 Markdown 文档编辑
- **富文本编辑器**: TinyMCE 富文本编辑器
- **文件上传**: 支持多种文件格式上传
- **Excel 导入导出**: 支持 Excel 文件的导入导出

## 🚀 技术栈

- **前端框架**: Vue 3.4+
- **构建工具**: Vite 5.4+
- **开发语言**: TypeScript 5.5+
- **UI 组件库**: Ant Design Vue 4.2+
- **状态管理**: Pinia 2.1+
- **路由管理**: Vue Router 4.4+
- **图表库**: ECharts 5.5+
- **表格组件**: VXE Table
- **CSS 框架**: UnoCSS
- **包管理器**: pnpm
- **代码规范**: ESLint + Prettier
- **提交规范**: Commitizen + Husky

## 🚀 快速开始

### 环境要求

- [Node.js](http://nodejs.org/) >= 18.12.0
- [pnpm](https://pnpm.io/) >= 9.0.2
- [Git](https://git-scm.com/) - 版本控制工具

### 安装

```bash
# 克隆项目
git clone https://github.com/fzlintg/light-admin.git

# 进入项目目录
cd light-admin

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm serve

# 或者使用
pnpm dev
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

### 代码检查

```bash
# 运行 ESLint
pnpm lint:eslint

# 运行 Prettier
pnpm lint:prettier

# 运行 Stylelint
pnpm lint:stylelint

# 运行所有检查
pnpm lint
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
│   ├── portal-view/         # 门户视图
│   └── test-server/         # 测试服务器
├── packages/                # 包目录
│   ├── components/          # 通用组件
│   │   ├── Form/           # 表单组件
│   │   ├── Table/          # 表格组件
│   │   ├── VxeTable/       # VXE表格组件
│   │   └── LightForm/      # 轻量表单组件
│   ├── views/              # 视图组件
│   │   └── form-design/    # 表单设计器
│   ├── hooks/              # 组合式函数
│   ├── utils/              # 工具函数
│   ├── store/              # 状态管理
│   ├── router/             # 路由配置
│   └── locales/            # 国际化
├── src/                    # 源码目录
│   ├── views/              # 页面视图
│   │   ├── dashboard/      # 仪表板
│   │   └── demo/           # 示例页面
│   ├── router/             # 路由配置
│   ├── api/                # API 接口
│   └── assets/             # 静态资源
├── mock/                   # Mock 数据
├── public/                 # 公共静态资源
└── types/                  # 类型定义
```

## 📖 使用指南

### 表单设计器使用

1. 访问 `/form-designer/design` 页面
2. 从左侧组件库拖拽组件到中间画布
3. 在右侧属性面板配置组件属性
4. 点击预览按钮查看表单效果
5. 导出 JSON 配置用于生产环境

### 自定义组件开发

```typescript
// 在 packages/views/form-design/extention/ 目录下创建新组件
export default {
  name: 'CustomComponent',
  label: '自定义组件',
  component: 'CustomComponent',
  // 组件配置...
};
```

## 🤝 如何贡献

我们非常欢迎您的贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### Git 提交规范

请遵循 [Angular 提交规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 🌐 浏览器支持

推荐使用 `Chrome 80+` 浏览器进行开发

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| :-: | :-: | :-: | :-: |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📄 更新日志

[CHANGELOG](./CHANGELOG.zh_CN.md)

## 🙏 致谢

本项目基于 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 进行开发，在此基础上进行了大量的修改和扩展，特别是可视化表单设计器功能。

感谢所有为开源社区做出贡献的开发者们！

## 📞 交流与支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- 提交 [Issue](https://github.com/fzlintg/light-admin/issues)
- 查看 [文档](./docs/)
- 参与 [讨论](https://github.com/fzlintg/light-admin/discussions)

## 📝 许可证

[MIT © lintg_2024](./LICENSE)
