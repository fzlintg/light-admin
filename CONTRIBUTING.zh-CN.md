# Light Admin 贡献指南

感谢你考虑为 Light Admin 做出贡献！本文档提供了参与项目开发的指南和说明。

[English](./CONTRIBUTING.md) | [简体中文](./CONTRIBUTING.zh-CN.md)

## 行为准则

参与本项目即表示你同意遵守我们的[行为准则](./CODE_OF_CONDUCT.zh-CN.md)。

## 如何贡献？

### 报告 Bug

在创建 bug 报告之前，请先检查现有的 issue 列表，以避免重复报告。创建 bug 报告时，请尽可能包含以下详细信息：

- 使用清晰描述性的标题
- 详细描述重现问题的具体步骤
- 提供具体的示例来演示这些步骤
- 描述你观察到的行为和期望看到的行为
- 如果可能，包含截图
- 包含你的环境信息（操作系统、浏览器等）

### 提出改进建议

改进建议通过 GitHub issues 进行跟踪。创建改进建议时，请包含：

- 清晰描述性的标题
- 详细描述建议的改进内容
- 解释为什么这个改进会有用
- 包含相关的示例或设计图

### Pull Requests

- 填写必要的模板
- 遵循代码风格指南
- 包含适当的测试用例
- 根据需要更新文档
- 确保所有测试通过

## 开发流程

### 配置开发环境

1. Fork 代码仓库
2. 克隆你的 fork：`git clone https://github.com/your-username/light-admin.git`
3. 添加上游远程仓库：`git remote add upstream https://github.com/original-owner/light-admin.git`
4. 安装依赖：`pnpm install`

### 开发工作流

1. 创建新分支：`git checkout -b feature/your-feature-name`
2. 进行修改
3. 运行测试：`pnpm test`
4. 按照提交规范提交更改
5. 推送到你的 fork：`git push origin feature/your-feature-name`
6. 创建 Pull Request

### 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

类型包括：
- feat: 新功能
- fix: Bug 修复
- docs: 文档更改
- style: 不影响代码含义的变化（空白、格式化等）
- refactor: 既不修复 bug 也不添加新功能的代码更改
- perf: 性能优化
- test: 添加或修正测试
- build: 影响构建系统或外部依赖的更改
- ci: CI 配置文件和脚本的更改
- chore: 其他不修改 src 或测试文件的更改

### 分支命名规范

- `feature/*`: 新功能
- `fix/*`: Bug 修复
- `docs/*`: 文档变更
- `refactor/*`: 代码重构
- `test/*`: 测试相关
- `chore/*`: 维护任务

## 代码风格指南

### JavaScript/TypeScript 代码风格

我们使用 ESLint 和 Prettier 进行代码格式化。配置文件在 `.eslintrc.cjs` 和 `.prettierrc.cjs` 中。

### CSS/SCSS 代码风格

我们使用 Stylelint 进行 CSS/SCSS 格式化。配置文件在 `.stylelintrc.cjs` 中。

### 组件开发指南

- 每个组件都应该在其自己的目录中
- 包含文档和示例
- 编写组件的单元测试
- 遵循项目的设计系统

### 测试指南

- 为所有新功能编写单元测试
- 提交 PR 前确保所有测试通过
- 争取高测试覆盖率

## 文档

- 更新任何功能变更的相关文档
- 使用清晰一致的语言
- 在适当的地方包含示例

## 其他说明

### Issue 和 Pull Request 标签

- `bug`: Bug 报告
- `enhancement`: 功能请求
- `documentation`: 文档改进
- `good first issue`: 适合新手的问题
- `help wanted`: 需要额外关注的问题

感谢你为 Light Admin 做出的贡献！
