# Schema转换系统 使用指南

## 安装

```bash
npm install @your-org/schema-converter
# 或
yarn add @your-org/schema-converter
```

## 基本使用

### 1. 导入转换器

```typescript
import { SchemaConverter, SchemaUtils } from '@your-org/schema-converter';
```

### 2. 定义设计态Schema

```typescript
const designSchema = {
  // 普通属性
  title: "用户注册表单",
  
  // 函数定义
  validateEmail__func: "return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)",
  validateEmail__params: ["email"],
  
  // 变量定义
  config__var: {
    apiUrl: "/api/users"
  }
};
```

### 3. 转换为运行态Schema

```typescript
const runtimeSchema = SchemaConverter.convert(designSchema);
```

### 4. 使用运行态Schema

```typescript
// 调用函数
const isValid = runtimeSchema.validateEmail('test@example.com');

// 访问变量
console.log(runtimeSchema.config.apiUrl); // 输出 "/api/users"
```

## 常见场景

### 表单验证

```typescript
const formSchema = {
  validate__func: `
    const errors = {};
    if (!username) errors.username = 'Required';
    if (password.length < 6) errors.password = 'Too short';
    return errors;
  `,
  validate__params: ['username', 'password']
};

const runtimeSchema = SchemaConverter.convert(formSchema);
const errors = runtimeSchema.validate('', '123');
// { username: 'Required', password: 'Too short' }
```

### API调用

```typescript
const apiSchema = {
  fetchUser__func: `
    const response = await axios.get(\`\${apiUrl}/users/\${id}\`);
    return response.data;
  `,
  fetchUser__params: ['id']
};

const runtimeSchema = SchemaConverter.convert(apiSchema, { axios });
const user = await runtimeSchema.fetchUser(123);
```

### 动态配置

```typescript
const configSchema = {
  features__var: {
    darkMode: true,
    analytics: false
  },
  
  isFeatureEnabled__func: `
    return features[featureName] || false;
  `,
  isFeatureEnabled__params: ['featureName']
};

const runtimeSchema = SchemaConverter.convert(configSchema);
const isDarkMode = runtimeSchema.isFeatureEnabled('darkMode'); // true
```

## 与前端框架集成

### React集成示例

```typescriptx
function FormComponent({ schema }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const runtimeSchema = useMemo(() => {
    return SchemaConverter.convert(schema);
  }, [schema]);

  const handleSubmit = () => {
    const validationErrors = runtimeSchema.validate(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      // 提交表单
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
    </form>
  );
}
```

### Vue集成示例

```typescript
export default defineComponent({
  setup() {
    const schema = ref({
      // 设计态Schema定义
    });

    const runtimeSchema = computed(() => {
      return SchemaConverter.convert(schema.value);
    });

    return { runtimeSchema };
  }
});
```

## 调试技巧

1. **检查Schema结构**:
   ```typescript
   SchemaUtils.inspectSchema(designSchema);
   ```

2. **验证Schema有效性**:
   ```typescript
   try {
     SchemaUtils.validateDesignSchema(mySchema);
   } catch (error) {
     console.error('Schema error:', error);
   }
   ```

3. **调试函数执行**:
   ```typescript
   const result = SchemaUtils.safeExecute(
     runtimeSchema.myFunction,
     { debug: true },
     ...args
   );
   ```

4. **获取所有函数名**:
   ```typescript
   const functionNames = SchemaUtils.getFunctionNames(runtimeSchema);
   ```

## 最佳实践

1. **保持函数简洁** - 将复杂逻辑拆分为多个小函数

2. **使用上下文共享工具** - 通过context参数注入常用工具

3. **合理使用变量** - 将配置数据定义为变量而非硬编码

4. **添加类型定义** - 为常用Schema创建TypeScript接口

5. **单元测试** - 为关键Schema和函数编写测试

## 注意事项

1. 函数中避免使用`eval`或`new Function`等动态执行代码

2. 谨慎处理用户输入的Schema，防止代码注入

3. 生产环境建议启用严格模式验证Schema

4. 复杂业务逻辑建议放在独立模块而非Schema函数中
