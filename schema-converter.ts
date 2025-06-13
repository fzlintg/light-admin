// 增强的类型定义
type Primitive = string | number | boolean | null;
type DesignValue = Primitive | DesignSchema | DesignSchema[];
type RuntimeValue = Primitive | Function | RuntimeSchema | RuntimeSchema[];

interface DesignSchema {
  [key: string]: DesignValue;
  [funcKey: `${string}__func`]: string;
  [paramsKey: `${string}__params`]: string[];
  [varKey: `${string}__var`]: any;
}

interface RuntimeSchema {
  [key: string]: RuntimeValue;
}

interface IntermediateSchema extends Omit<DesignSchema, 
  `${string}__func` | `${string}__params` | `${string}__var`> {
  [key: string]: DesignValue | string;
}

// 转换器类封装
export class SchemaConverter {
  private static FUNC_REGEX = /"\$func_b\s([^$]*)\s\$_\$([^$]*)\$func_e"/g;
  private static VAR_REGEX = /"\$var_b:([^:]*):\$var_e"/g;
  
  // 带缓存的转换
  private static cache = new WeakMap<DesignSchema, RuntimeSchema>();
  
  // 公开的转换入口
  static convert(designSchema: DesignSchema, context: object = {}): RuntimeSchema {
    if (this.cache.has(designSchema)) {
      return this.cache.get(designSchema)!;
    }
    
    this.validateDesignSchema(designSchema);
    const intermediate = this.preprocess(designSchema);
    const runtimeSchema = this.compile(intermediate);
    const result = this.createRuntime(runtimeSchema, context);
    
    this.cache.set(designSchema, result);
    return result;
  }
  
  // 设计态校验
  private static validateDesignSchema(schema: DesignSchema) {
    for (const key in schema) {
      if (key.endsWith('__func')) {
        const paramsKey = key.replace('__func', '__params');
        if (!(paramsKey in schema)) {
          throw new Error(`Missing params for function ${key}`);
        }
        if (!Array.isArray(schema[paramsKey])) {
          throw new Error(`Function params ${paramsKey} must be an array`);
        }
      }
    }
  }
  
  // 预处理阶段（增强版）
  private static preprocess(designSchema: DesignSchema): IntermediateSchema {
    const result: IntermediateSchema = {...designSchema};
    
    for (const key in designSchema) {
      try {
        // 处理函数类型
        if (key.endsWith('__func')) {
          const funcName = key.replace('__func', '');
          const paramsKey = `${funcName}__params`;
          
          if (!(paramsKey in designSchema)) {
            throw new Error(`Missing params for function ${key}`);
          }
          
          result[funcName] = `$func_b ${result[paramsKey].join(",")} $_$ ${result[key]} $func_e`;
          delete result[key];
          delete result[paramsKey];
        }
        
        // 处理变量类型
        if (key.endsWith('__var')) {
          const varName = key.replace('__var', '');
          result[varName] = `$var_b:${JSON.stringify(result[key])}:$var_e`;
          delete result[key];
        }
      } catch (error) {
        console.error(`Error processing key ${key}:`, error);
        throw error;
      }
    }
    
    return result;
  }
  
  // 编译阶段（安全增强）
  private static compile(schema: IntermediateSchema): RuntimeSchema {
    try {
      const schemaStr = JSON.stringify(schema);
      
      // 安全替换函数表达式
      const funcProcessed = schemaStr.replace(
        this.FUNC_REGEX, 
        (match, params, func) => {
          // 基本XSS防护
          const sanitizedFunc = func.replace(/</g, '\\u003c');
          const isAsync = func.includes('await') ? 'async' : '';
          return `${isAsync}(${params}) => {${sanitizedFunc}}`;
        }
      );
      
      // 安全替换变量表达式
      const varProcessed = funcProcessed.replace(
        this.VAR_REGEX,
        (match, value) => {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
      );
      
      return JSON.parse(varProcessed);
    } catch (error) {
      throw new Error(`Compilation failed: ${error.message}`);
    }
  }
  
  // 执行环境封装（安全增强）
  private static createRuntime(schema: RuntimeSchema, context: object) {
    const wrapped: RuntimeSchema = {...schema};
    
    for (const key in schema) {
      const value = schema[key];
      
      if (typeof value === 'function') {
        try {
          // 使用沙箱环境执行函数
          wrapped[key] = this.createSafeFunction(value, context);
        } catch (error) {
          console.error(`Error wrapping function ${key}:`, error);
          wrapped[key] = () => {
            throw new Error(`Function ${key} execution failed: ${error.message}`);
          };
        }
      } else if (typeof value === 'object' && value !== null) {
        // 递归处理嵌套对象
        wrapped[key] = this.createRuntime(value as RuntimeSchema, context);
      }
    }
    
    return wrapped;
  }
  
  // 安全函数创建
  private static createSafeFunction(fn: Function, context: object): Function {
    const allowedGlobals = ['Array', 'Object', 'Number', 'String', 'Date'];
    const sandbox = Object.fromEntries(
      Object.entries(context).filter(([key]) => allowedGlobals.includes(key))
    );
    
    return (...args: any[]) => {
      try {
        return new Function(
          'context',
          `with(context) { return (${fn.toString()}).apply(this, arguments) }`
        ).call(null, sandbox)(...args);
      } catch (error) {
        console.error('Function execution error:', error);
        throw error;
      }
    };
  }
}

// 使用示例
const designSchema =
