export const userFormSchema = {
  title: '用户注册表单',

  fields: {
    username: {
      label: '用户名',
      type: 'text',
      required: true,
    },
    password: {
      label: '密码',
      type: 'password',
      required: true,
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
    submit__params: ['values', 'axios'],
  },
};
