# Schema转换系统 API参考

## SchemaConverter类

核心转换器类，提供设计态到运行态的Schema转换功能。

### 静态方法

#### `convert(designSchema: DesignSchema, context?: object): RuntimeSchema`

将设计态Schema转换为运行态Schema。

**参数**:
- `designSchema`: 设计态Schema对象
- `context`: 可选，提供给运行时函数的上下文对象

**返回**: 运行态Schema对象

**示例**:
```typescript
const designSchema = {
  greet__func: 'return `Hello, ${name}!`',
  greet__params: ['name']
};

const runtimeSchema = SchemaConverter.convert(designSchema);
runtimeSchema.greet('World'); // 返回 "Hello, World!"
```

---

## SchemaUtils类

实用工具函数集合，辅助Schema的创建和操作。

### 静态方法

#### `validateDesignSchema(schema: unknown): boolean`

验证对象是否是有效的设计态Schema。

**参数**:
- `schema`: 要验证的对象

**返回**: 如果是有效设计态Schema则返回true，否则抛出错误

**示例**:
```typescript
try {
  SchemaUtils.validateDesignSchema(mySchema);
  console.log('Schema is valid');
} catch (error) {
  console.error('Invalid schema:', error.message);
}
```

#### `createFunctionDef(funcBody: string, params?: string[]): DesignSchema`

创建函数定义的设计态Schema片段。

**参数**:
- `funcBody`: 函数体代码字符串
- `params`: 可选，参数名数组

**返回**: 包含函数定义的设计态Schema片段

**示例**:
```typescript
const funcDef = SchemaUtils.createFunctionDef('return a + b', ['a', 'b']);
// 返回 { "123456__func": "return a + b", "123456__params": ["a", "b"] }
```

#### `createVariableDef(value: any): DesignSchema`

创建变量定义的设计态Schema片段。

**参数**:
- `value`: 变量值

**返回**: 包含变量定义的设计态Schema片段

**示例**:
```typescript
const varDef = SchemaUtils.createVariableDef({ apiUrl: '/api' });
// 返回 { "123456__var": { apiUrl: '/api' } }
```

#### `mergeSchemas(...schemas: DesignSchema[]): DesignSchema`

合并多个设计态Schema。

**参数**:
- `schemas`: 要合并的设计态Schema数组

**返回**: 合并后的设计态Schema

**示例**:
```typescript
const merged = SchemaUtils.mergeSchemas(schema1, schema2, schema3);
```

#### `isRuntimeFunction(value: unknown): boolean`

检查值是否是运行时函数。

**参数**:
- `value`: 要检查的值

**返回**: 如果是运行时函数则返回true

**示例**:
```typescript
if (SchemaUtils.isRuntimeFunction(schema.myFunc)) {
  schema.myFunc();
}
```

#### `getFunctionNames(schema: RuntimeSchema): string[]`

获取Schema中所有函数名。

**参数**:
- `schema`: 运行态Schema

**返回**: 函数名数组

**示例**:
```typescript
const funcNames = SchemaUtils.getFunctionNames(runtimeSchema);
```

#### `inspectSchema(schema: DesignSchema | RuntimeSchema, depth?: number): void`

打印Schema结构用于调试。

**参数**:
- `schema`: 要检查的Schema
- `depth`: 可选，打印深度

**示例**:
```typescript
SchemaUtils.inspectSchema(mySchema, 3);
```

#### `safeExecute(func: Function, context?: object, ...args: any[]): any`

安全执行运行时函数。

**参数**:
- `func`: 要执行的函数
- `context`: 可选，执行上下文
- `args`: 函数参数

**返回**: 函数执行结果

**示例**:
```typescript
const result = SchemaUtils.safeExecute(
  runtimeSchema.calculate,
  { multiplier: 2 },
  5
);
```

#### `createConverter(defaultContext?: object): { convert: Function }`

创建带有默认上下文的转换器实例。

**参数**:
- `defaultContext`: 可选，默认上下文对象

**返回**: 包含convert方法的对象

**示例**:
```typescript
const converter = SchemaUtils.createConverter({ axios });
const runtimeSchema = converter.convert(designSchema);
```

---

## 类型定义

### `DesignSchema`

设计态Schema接口，可以包含普通属性、函数定义和变量定义。

**属性**:
- `[key: string]`: 普通属性值
- `[funcKey: \`\${string}__func\`]`: 函数体字符串
- `[paramsKey: \`\${string}__params\`]`: 函数参数数组
- `[varKey: \`\${string}__var\`]`: 变量值

### `RuntimeSchema`

运行态Schema接口，转换后的Schema可能包含函数。

**属性**:
- `[key: string]`: 普通属性值或函数
