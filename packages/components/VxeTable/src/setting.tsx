import { VxeUI } from '..';
import XEUtils from 'xe-utils';
import componentSetting from '@settings/componentSetting';
import { Tag } from 'ant-design-vue';
import { isBoolean } from 'lodash-es';

VxeUI.setConfig(componentSetting.vxeTable);
//add by lintg.
VxeUI.formats.add('date', {
  cellFormatMethod: ({ cellValue }) => {
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd');
  },
});
VxeUI.formats.add('datetime', {
  cellFormatMethod: ({ cellValue }) => {
    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm');
  },
});
VxeUI.formats.add('bool', {
  cellFormatMethod: ({ cellValue }) => {
    return cellValue ? '是' : '否';
  },
});
VxeUI.formats.add('json', {
  cellFormatMethod: ({ cellValue }) => {
    if (!cellValue) return '';
    return JSON.stringify(cellValue, null, 4).replace(/\\n/g, ' ');
  },
});
VxeUI.renderer.add('icon', {
  renderDefault(renderOpts, params) {
    const { row, column, $table } = params;
    const value = row[column.field];
    return [<Icon icon={value}></Icon>];
  },
});
VxeUI.renderer.add('dict', {
  renderDefault(renderOpts, params) {
    const { row, column, $table } = params;
    const mapData = $table.xegrid.props.formConfig.dict.map;
    const value = row[column.field];

    //return toRaw(dict)[column.field].find((v) => v.value == value).label;
    // return [<span>{dict[column.field][value] ?? value}</span>];
    // return dict[column.field];
    // if (!dict?.[dictName || column.field]) return;

    if (Array.isArray(value)) {
      return value.map((item) => {
        return [<Tag color="success">{mapData?.[column.field]?.[item]}</Tag>];
      });
    } else {
      const data = mapData?.[column.field]?.[value];
      if (isBoolean(value)) {
        if (value === true) return [<Tag color="success">{data ?? '是'}</Tag>];
        else return [<Tag color="error">{data ?? '否'}</Tag>];
      }
      return [<Tag color="success">{data}</Tag>];
    }
  },
});
// VxeUI.formats.add('myDict', {
//   cellFormatMethod: (params) => {
//     debugger;
//     // if (!params.cellValue) return '';
//     // return params.cellValue;
//     // return JSON.stringify(cellValue, null, 4).replace(/\\n/g, ' ');
//   },
// });
// VxeUI.formats.add('dict', {
//   cellFormatMethod: ({ cellValue, column }) => {
//     if (!cellValue) return '';
//     return cellValue[column.params.labelField];
//     // return JSON.stringify(cellValue, null, 4).replace(/\\n/g, ' ');
//   },
// });
// VxeUI.formats.add('dicts', {
//   cellFormatMethod: ({ cellValue, column }) => {
//     if (!cellValue) return '';
//     if (Array.isArray(cellValue)) {
//       return cellValue.map((item) => item[column.params.labelField]).join(',');
//     }

//     // return JSON.stringify(cellValue, null, 4).replace(/\\n/g, ' ');
//   },
// });
VxeUI.commands.add('insert_form', {
  commandMethod: (params) => {
    const { $grid } = params;
    $grid.context.emit('insertForm');
  },
});
VxeUI.commands.add('expandAll', {
  commandMethod: (params) => {
    const { $grid } = params;
    if ($grid) {
      $grid?.setAllTreeExpand(true);
    }
  },
});
