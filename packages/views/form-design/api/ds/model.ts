export default [
  {
    name: 'user',
    label: '用户',
    url: '${apiServer}/model/user',
    actions: {
      update: {
        path: '/update',
        method: 'POST',
      },
      insert: {
        path: '',
        method: 'POST',
      },
    },
  },
  {
    name: 'user2',
    label: '用户2',
    url: '${apiServer}/model/user',
    actions: {
      update: {
        path: '/update',
        method: 'POST',
      },
      insert: {
        path: '',
        method: 'POST',
      },
    },
  },
];
