# Schema转换系统 React示例

这个示例展示了如何在React项目中使用Schema转换系统来构建动态表单。

## 项目结构

```
/react-demo
  ├── public/            # 静态资源
  ├── src/
  │   ├── components/    # React组件
  │   ├── schemas/       # 设计态Schema定义
  │   ├── App.js         # 主应用组件
  │   └── index.js       # 应用入口
  ├── package.json       # 项目依赖
  └── README.md          # 项目说明
```

## 快速开始

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm start
```

3. 访问应用
```
http://localhost:3000
```

## 核心代码示例

### 1. 定义表单Schema (schemas/user-form.js)

```javascript
import { SchemaUtils } from '@your-org/schema-converter';

export const userFormSchema = {
  title: "用户注册表单",
  
  fields: {
    username: {
      label: "用户名",
      type: "text",
      required: true
    },
    
    // 表单验证规则
    validate__func: `
      const errors = {};
      if (!values.username) errors.username = '请输入用户名';
      if (values.password.length < 6) errors.password = '密码至少6位';
      return errors;
    `,
    validate__params: ['values'],
    
    // 提交逻辑
    submit__func: `
      try {
        const response = await axios.post('/api/register', values);
        return response.data;
      } catch (error) {
        throw error.response?.data || { message: '注册失败' };
      }
    `,
    submit__params: ['values', 'axios']
  }
};
```

### 2. 创建动态表单组件 (components/DynamicForm.js)

```jsx
import React, { useState, useMemo } from 'react';
import { SchemaConverter } from '@your-org/schema-converter';
import axios from 'axios';

function DynamicForm({ schema }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // 转换为运行态Schema
  const runtimeSchema = useMemo(() => {
    return SchemaConverter.convert(schema, { axios });
  }, [schema]);

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 执行验证
    const validationErrors = runtimeSchema.validate(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const result = await runtimeSchema.submit(values);
        setSubmitResult(result);
      } catch (error) {
        setSubmitResult({ error: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{schema.title}</h2>
      
      {Object.entries(schema.fields).map(([name, field]) => {
        if (name.startsWith('_')) return null;
        
        return (
          <div key={name} className="form-group">
            <label>{field.label}</label>
            <input
              type={field.type || 'text'}
              value={values[name] || ''}
              onChange={(e) => handleChange(name, e.target.value)}
              required={field.required}
            />
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        );
      })}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '提交'}
      </button>
      
      {submitResult && (
        <div className="result">
          {submitResult.error ? (
            <div className="error">{submitResult.error}</div>
          ) : (
            <div className="success">注册成功!</div>
          )}
        </div>
      )}
    </form>
  );
}

export default DynamicForm;
```

### 3. 主应用组件 (App.js)

```jsx
import React from 'react';
import DynamicForm from './components/DynamicForm';
import { userFormSchema } from './schemas/user-form';

function App() {
  return (
    <div className="app">
      <h1>动态表单示例</h1>
      <DynamicForm schema={userFormSchema} />
    </div>
  );
}

export default App;
```

## 运行效果

1. 表单渲染:
   - 根据Schema动态生成表单字段
   - 自动应用验证规则
   - 显示验证错误信息

2. 表单提交:
   - 调用Schema定义的submit函数
   - 处理异步提交状态
   - 显示提交结果

## 扩展功能

1. 添加更多字段类型支持 (select, checkbox等)
2. 实现表单字段的动态显示/隐藏
3. 添加表单重置功能
4. 支持多步骤表单
5. 添加本地存储自动保存功能

## 学习资源

1. [Schema转换系统API文档](../docs/api-reference.md)
2. [Schema转换系统使用指南](../docs/usage-guide.md)
3. [React官方文档](https://reactjs.org/docs/getting-started.html)
