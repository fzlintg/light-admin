const jsonModules = import.meta.glob('./json/**/*.ts', { eager: true });
const json = {};
for (const path in jsonModules) {
  const filename=path.split('/')[2];
  const name = filename.substr(0,filename.length-3);
  json[name] = jsonModules[path].default;
}

export default json;
