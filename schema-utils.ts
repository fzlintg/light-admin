import { SchemaConverter, DesignSchema, RuntimeSchema } from './schema-converter';

/**
 * Schema工具库
 */
export class SchemaUtils {
  /**
   * 验证设计态Schema是否有效
   */
  static validateDesignSchema(schema: unknown): schema is DesignSchema {
    if (typeof schema !== 'object' || schema === null) {
      throw new Error('Schema must be an object');
    }

    for (const key in schema as DesignSchema) {
      const value = (schema as DesignSchema)[key];

      // 验证函数定义
      if (key.endsWith('__func')) {
        const paramsKey = key.replace('__func', '__params');
        if (!(paramsKey in (schema as DesignSchema))) {
          throw new Error(`Missing params for function ${key}`);
        }
        if (typeof value !== 'string') {
          throw new Error(`Function body ${key} must be a string`);
        }
      }

      // 验证参数定义
      if (key.endsWith('__params')) {
        if (!Array.isArray(value)) {
          throw new Error(`Function params ${key} must be an array`);
        }
      }

      // 递归验证嵌套对象
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        this.validateDesignSchema(value);
      }
    }

    return true;
  }

  /**
   * 创建函数定义
   */
  static createFunctionDef(funcBody: string, params: string[] = []) {
    return {
      [`${Date.now()}__func`]: funcBody,
      [`${Date.now()}__params`]: params,
    };
  }

  /**
   * 创建变量定义
   */
  static createVariableDef(value: any) {
    return {
      [`${Date.now()}__var`]: value,
    };
  }

  /**
   * 合并多个设计态Schema
   */
  static mergeSchemas(...schemas: DesignSchema[]): DesignSchema {
    return schemas.reduce((merged, current) => {
      return { ...merged, ...current };
    }, {});
  }

  /**
   * 判断是否是运行时函数
   */
  static isRuntimeFunction(value: unknown): value is Function {
    return typeof value === 'function';
  }

  /**
   * 获取Schema中所有函数名
   */
  static getFunctionNames(schema: RuntimeSchema): string[] {
    return Object.keys(schema).filter((key) => this.isRuntimeFunction(schema[key]));
  }

  /**
   * 调试工具：打印Schema结构
   */
  static inspectSchema(schema: DesignSchema | RuntimeSchema, depth = 2) {
    console.log(JSON.stringify(schema, null, 2));

    if ('__converted' in schema) {
      console.log('(Runtime Schema)');
    } else {
      console.log('(Design Schema)');
    }
  }

  /**
   * 安全执行运行时函数
   */
  static safeExecute(func: Function, context: object = {}, ...args: any[]) {
    try {
      return func.call(context, ...args);
    } catch (error) {
      console.error('Function execution failed:', error);
      throw error;
    }
  }

  /**
   * 创建带有默认上下文的新转换器实例
   */
  static createConverter(defaultContext: object = {}) {
    return {
      convert: (schema: DesignSchema, additionalContext: object = {}) => {
        return SchemaConverter.convert(schema, {
          ...defaultContext,
          ...additionalContext,
        });
      },
    };
  }
}

// 预置的常用上下文
export const DEFAULT_CONTEXT = {
  // 常用工具函数
  utils: {
    isEmpty: (obj: any) => Object.keys(obj).length === 0,
    deepClone: (obj: any) => JSON.parse(JSON.stringify(obj)),
  },
  // 常用验证函数
  validators: {
    isEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    isPhone: (phone: string) => /^1[3-9]\d{9}$/.test(phone),
  },
};

// 快捷方式
export const {
  validateDesignSchema,
  createFunctionDef,
  createVariableDef,
  mergeSchemas,
  isRuntimeFunction,
  getFunctionNames,
  inspectSchema,
  safeExecute,
  createConverter,
} = SchemaUtils;
