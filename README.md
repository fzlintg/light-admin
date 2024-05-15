
## Install and use

- Get the project code

```bash
git clone https://github.com/fzlintg/light-admin
```

- Install dependencies

```bash
cd light-admin

pnpm install

```

- run

```bash
pnpm serve
```

- build

```bash
pnpm build
```

- docker

### The dockerFile is located in the project root directory and supports differential deployment

#### build image

```bash
docker build -t light-admin .
```

#### Use environment variables to achieve differentiated container deployment. Specify service endpoint by assigning `VG_BASE_URL`. In the following example, `http://localhost:3333` is used as the back-end service address and the container is mapped to port `6666`:

```bash
docker run --name light-admin -d -p 6666:80  -e VG_BASE_URL=http://localhost:3333 light-admin
```

Then you can navigate to `http://localhost:6666`

## Change Log

[CHANGELOG](./CHANGELOG.zh_CN.md)

## Project

本项目是来源于vben-vue-admin，并做了大量的修改，特别是可视化表单，把几乎所有的组件都进行了可视化，并设计了一个非常完美通用的组件化架构，把vxe-table和echarts进行任意的模板化配置。



[![Star History Chart](https://api.star-history.com/svg?repos=vbenjs/vue-vben-admin&type=Date)](https://star-history.com/#vbenjs/vue-vben-admin&Date)

## License

[MIT © Vben-2020](./LICENSE)
