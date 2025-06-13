# Contributing to Light Admin

Thank you for considering contributing to Light Admin! This document provides guidelines and instructions for contributing to this project.

[English](./CONTRIBUTING.md) | [简体中文](./CONTRIBUTING.zh-CN.md)

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find that the bug has already been reported. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what behavior you expected to see
- Include screenshots if possible
- Include details about your environment (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- Include any relevant examples or mockups

### Pull Requests

- Fill in the required template
- Follow the style guides
- Include appropriate test cases
- Update documentation as needed
- Ensure all tests pass

## Development Process

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/light-admin.git`
3. Add upstream remote: `git remote add upstream https://github.com/original-owner/light-admin.git`
4. Install dependencies: `pnpm install`

### Development Workflow

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `pnpm test`
4. Commit your changes following the commit convention
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- chore: Other changes that don't modify src or test files

### Branch Naming Convention

- `feature/*`: For new features
- `fix/*`: For bug fixes
- `docs/*`: For documentation changes
- `refactor/*`: For code refactoring
- `test/*`: For adding or modifying tests
- `chore/*`: For maintenance tasks

## Style Guides

### JavaScript/TypeScript Style Guide

We use ESLint and Prettier for code formatting. The configuration is in `.eslintrc.cjs` and `.prettierrc.cjs`.

### CSS/SCSS Style Guide

We use Stylelint for CSS/SCSS formatting. The configuration is in `.stylelintrc.cjs`.

### Component Development Guidelines

- Each component should be in its own directory
- Include documentation and examples
- Write unit tests for components
- Follow the project's design system

### Testing Guidelines

- Write unit tests for all new features
- Ensure all tests pass before submitting a PR
- Aim for high test coverage

## Documentation

- Update documentation for any changed functionality
- Use clear and consistent language
- Include examples where appropriate

## Additional Notes

### Issue and Pull Request Labels

- `bug`: Bug reports
- `enhancement`: Feature requests
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

Thank you for contributing to Light Admin!
