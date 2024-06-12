import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';

class TableEdgeNode extends PolylineEdge {
  // 官网指示：由于边的编辑复杂度问题，绝大多数情况下，自定义边时不推荐自定义view
}

class TableEdgeModel extends PolylineEdgeModel {
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const { properties } = this;
    if (properties.isActived) {
      style.strokeDasharray = '4 4';
    }
    style.stroke = 'orange';
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    style.color = '#3451F1';
    style.fontSize = 20;
    style.background && (style.background.fill = '#F2F131');
    return style;
  }

  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'red';
    style.hover && (style.hover.stroke = 'red');
    return style;
  }
}

export default {
  type: 'TableEdge',
  view: TableEdgeNode,
  model: TableEdgeModel,
};
