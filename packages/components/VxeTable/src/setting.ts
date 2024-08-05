import { VxeUI } from '..';
import XEUtils from 'xe-utils';
import componentSetting from '@settings/componentSetting';

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
VxeUI.formats.add('dict', {
  cellFormatMethod: ({ cellValue, column }) => {
    if (!cellValue) return '';

    return cellValue[column.params.labelField];
    // return JSON.stringify(cellValue, null, 4).replace(/\\n/g, ' ');
  },
});
VxeUI.commands.add('insert_form', {
  commandMethod: (params) => {
    const { $grid } = params;
    $grid.context.emit('insertForm');
  },
});
