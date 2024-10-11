export const logics = ['system.db.table'];
export const exclude = ['db', 'table', 'hideSet'];
export const hide = {
  options: [
    {
      label: '自动树',
      value: 'auto',
    },
    {
      label: '通用树',
      value: 'general',
    },
  ],
  setting: {
    auto: ['loadData__func', 'initData__func'],
  },
};
