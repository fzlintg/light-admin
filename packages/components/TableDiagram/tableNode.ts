import { h, RectNode, RectNodeModel } from '@logicflow/core';
// import { Button } from 'ant-design';

class TableNodeView extends RectNode {
  getShape() {
    // 获取XxxNodeModel中定义的形状属性
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    // 获取XxxNodeModel中定义的样式属性
    const style = model.getNodeStyle();

    return h('g', {}, [
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        rx: radius,
        ry: radius,
      }),
      h('Button', { onClick: () => alert('ok') }, 'ok'),
      h(
        'svg',
        {
          x: x - width / 2 + 5,
          y: y - height / 2 + 5,
          width: 25,
          height: 25,
          viewBox: '0 0 1028 1024',
        },
        [
          h('path', {
            fill: style.stroke,
            d: 'M20.6692 180.672c-27.104 27.136-21.312 65.344 0.256 86.88 0.864 0.832 87.488 83.584 209.312 205.408 3.136 3.136 7.232 4.672 11.328 4.672s8.192-1.568 11.328-4.672c6.24-6.24 6.24-16.384 0-22.624-18.368-18.368-35.84-35.744-52.416-52.192l50.848-50.848c6.24-6.24 6.24-16.384 0-22.624s-16.384-6.24-22.624 0l-50.976 50.976c-28.512-28.16-53.632-52.736-74.08-72.672l115.68-115.68c6.24-6.24 6.24-16.384 0-22.624s-16.384-6.24-22.624 0l-116.032 116.032c-23.552-22.816-37.12-35.776-37.344-36-6.752-6.752-15.616-25.76 0-41.376l160-160c6.176-6.272 22.624-18.72 40.672-0.768 0.8 0.896 81.6 92.672 204.928 216 6.24 6.24 16.384 6.24 22.624 0s6.24-16.384 0-22.624c-122.56-122.528-202.752-213.6-204.224-215.264-29.824-29.76-65.792-20.832-86.624 0l-160.032 160zM699.3252 772.672c-6.24-6.24-16.384-6.24-22.624 0l-50.912 50.88c-15.52-15.712-31.808-32.16-48.96-49.312-6.24-6.24-16.384-6.24-22.624 0s-6.24 16.384 0 22.624c118.528 118.496 201.312 207.008 202.496 208.288 10.976 11.008 26.016 17.056 42.336 17.056l0 0c16.8 0 33.792-6.56 44.32-17.12l159.936-161.824c20.128-20.128 21.28-54.272 2.496-73.12l-214.592-214.56c-6.24-6.24-16.384-6.24-22.624 0s-6.24 16.384 0 22.624l214.592 214.56c6.4 6.4 5.184 20.224-2.528 27.936l-159.968 161.824c-3.68 3.712-12.032 7.68-21.632 7.68 0 0 0 0 0 0-5.504 0-13.376-1.344-19.328-7.328-0.32-0.352-13.728-14.656-36.992-39.008l116.608-116.608c6.24-6.24 6.24-16.384 0-22.624s-16.384-6.24-22.624 0l-116.128 116.128c-19.968-20.768-44.448-46.016-72.32-74.432l51.072-51.072c6.24-6.208 6.24-16.32 0-22.592zM4.5412 1018.528c3.072 3.136 7.2 4.8 11.456 4.8 1.536 0 3.072-0.224 4.576-0.672l320-95.328c2.592-0.768 4.896-2.144 6.784-4.064l546.88-550.56c0.768-0.768 1.152-1.76 1.728-2.624l116.992-116.992c9.408-9.44 14.624-21.952 14.624-35.296s-5.216-25.824-14.624-35.2l-167.52-167.488c-18.816-18.816-51.68-18.816-70.496 0l-119.648 119.648c-0.768 0.768-1.184 1.76-1.76 2.656l-547.712 547.744c-1.792 1.792-3.136 3.968-3.904 6.368l-101.12 310.88c-1.856 5.664-0.416 11.84 3.744 16.128zM667.5172 168.672l33.248 33.248-496.736 498.08-55.264-12.544 518.752-518.784zM223.9972 725.312l499.424-500.736 77.952 77.952-503.936 497.472-73.44 0 0-74.688zM860.2852 361.472l-519.808 523.328-18.464-64.064 501.984-495.584 36.288 36.32zM127.7732 715.488l64.224 14.592 0 85.92c0 8.832 7.168 16 16 16l83.968 0 20.288 70.4-271.616 80.928 87.136-267.84zM797.5972 37.728c6.752-6.752 18.496-6.752 25.248 0l167.52 167.52c3.36 3.36 5.216 7.84 5.216 12.608 0 4.736-1.856 9.248-5.248 12.64l-107.872 107.904-192.736-192.736 107.872-107.936z',
          }),
        ],
      ),
    ]);
  }
}

class TableNodeModel extends RectNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = 'green';
    return style;
  }
  initNodeData(data: any): void {
    super.initNodeData(data);
    this.width = 120;
    this.height = 80;
    this.radius = 10;
  }
}

export default {
  type: 'TableNode',
  view: TableNodeView,
  model: TableNodeModel,
};
