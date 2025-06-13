# Schema转换系统 - Vue 3示例项目

这个示例项目展示了如何在Vue 3项目中使用Schema转换系统来构建动态表单。

## 项目概述

- 使用Vue 3组合式API实现
- 演示设计态Schema到运行态Schema的转换
- 包含动态表单组件
- 支持表单验证和提交逻辑
- 响应式设计

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问应用

```
http://localhost:3000
```

## 项目结构

```
/playground
  ├── src/
  │   ├── assets/          # 静态资源
  │   ├── components/      # Vue组件
  │   ├── schemas/         # 设计态Schema定义
  │   ├── App.vue          # 主应用组件
  │   ├── main.js          # 应用入口
  │   └── main.css         # 全局样式
  ├── package.json         # 项目依赖
  └── README.md            # 项目说明
```

## 核心功能

### 动态表单组件

`DynamicForm.vue`组件接收设计态Schema作为prop，自动转换为运行态Schema并渲染表单。

### Schema定义

在`schemas/`目录下定义设计态Schema，例如：

```javascript
// user-form.js
export const userFormSchema = {
  title: "用户注册表单",
  
  fields: {
    username: {
      label: "用户名",
      type: "text",
      required: true
    },
    // 更多字段定义...
  },
  
  // 验证逻辑
  validate__func: `...`,
  
  // 提交逻辑
  submit__func: `...`
};
```

### Schema转换

使用`SchemaConverter.convert()`方法将设计态Schema转换为运行态Schema：

```javascript
const runtimeSchema = SchemaConverter.convert(designSchema, context);
```

## 开发指南

1. 添加新Schema:
   - 在`schemas/`目录下创建新的Schema文件
   - 定义设计态Schema结构
   - 在App.vue中导入并使用

2. 扩展表单功能:
   - 修改`DynamicForm.vue`组件
   - 支持更多字段类型(select, checkbox等)
   - 添加表单布局选项

3. 测试Schema:
   - 确保验证逻辑正确
   - 测试提交功能

## 相关文档

- [Schema转换系统API文档](../docs/api-reference.md)
- [Schema转换系统使用指南](../docs/usage-guide.md)
- [Vue 3官方文档](https://vuejs.org/guide/introduction.html)
