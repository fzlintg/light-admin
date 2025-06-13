import { SchemaConverter } from './schema-converter';

describe('SchemaConverter', () => {
  // 测试基础类型转换
  test('should handle primitive types', () => {
    const designSchema = {
      stringProp: 'text',
      numberProp: 123,
      boolProp: true,
      nullProp: null,
    };

    const runtimeSchema = SchemaConverter.convert(designSchema);

    expect(runtimeSchema.stringProp).toBe('text');
    expect(runtimeSchema.numberProp).toBe(123);
    expect(runtimeSchema.boolProp).toBe(true);
    expect(runtimeSchema.nullProp).toBeNull();
  });

  // 测试函数转换
  test('should convert function definitions', () => {
    const designSchema = {
      add__func: 'return a + b',
      add__params: ['a', 'b'],
    };

    const runtimeSchema = SchemaConverter.convert(designSchema);
    expect(typeof runtimeSchema.add).toBe('function');
    expect(runtimeSchema.add(1, 2)).toBe(3);
  });

  // 测试异步函数
  test('should handle async functions', () => {
    const designSchema = {
      fetchData__func: 'const res = await fetch(url); return res.json();',
      fetchData__params: ['url'],
    };

    const runtimeSchema = SchemaConverter.convert(designSchema);
    expect(runtimeSchema.fetchData.toString()).toContain('async');
  });

  // 测试变量转换
  test('should convert variables', () => {
    const designSchema = {
      config__var: { apiUrl: '/api' },
    };

    const runtimeSchema = SchemaConverter.convert(designSchema);
    expect(runtimeSchema.config).toEqual({ apiUrl: '/api' });
  });

  // 测试嵌套结构
  test('should handle nested schemas', () => {
    const designSchema = {
      user: {
        validate__func: 'return name.length > 0',
        validate__params: ['name'],
        permissions__var: ['read', 'write'],
      },
    };

    const runtimeSchema = SchemaConverter.convert(designSchema);
    expect(typeof runtimeSchema.user.validate).toBe('function');
    expect(runtimeSchema.user.validate('test')).toBe(true);
    expect(runtimeSchema.user.permissions).toEqual(['read', 'write']);
  });

  // 测试上下文注入
  test('should inject context into functions', () => {
    const designSchema = {
      fetch__func: 'return axios.get(url)',
      fetch__params: ['url'],
    };

    const mockAxios = {
      get: jest.fn().mockResolvedValue({ data: 'response' }),
    };

    const runtimeSchema = SchemaConverter.convert(designSchema, { axios: mockAxios });
    runtimeSchema.fetch('/api');
    expect(mockAxios.get).toHaveBeenCalledWith('/api');
  });

  // 测试错误处理
  test('should throw on invalid function definition', () => {
    const designSchema = {
      invalid__func: 'return x + y',
      // 缺少params定义
    };

    expect(() => SchemaConverter.convert(designSchema)).toThrow();
  });

  // 测试缓存功能
  test('should cache converted schemas', () => {
    const designSchema = {
      test__func: 'return 42',
      test__params: [],
    };

    const firstResult = SchemaConverter.convert(designSchema);
    const secondResult = SchemaConverter.convert(designSchema);
    expect(firstResult).toBe(secondResult);
  });

  // 测试XSS防护
  test('should sanitize function code', () => {
    const designSchema = {
      malicious__func: 'alert("XSS"); return true;',
      malicious__params: [],
    };

    const runtimeSchema = SchemaConverter.convert(designSchema);
    expect(runtimeSchema.malicious.toString()).toContain('\\u003c');
  });
});
