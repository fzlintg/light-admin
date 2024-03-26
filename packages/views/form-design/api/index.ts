const modules = import.meta.glob('./ds/*.ts', { eager: true });
const api = [];
for (const path in modules) {
  const name = path.split('/')[2].split('.')[0];
  api.push(
    ...modules[path].default.map((item) => {
      return { ...item, name: `${name}.${item.name}` };
    }),
  );
}

export default api;
