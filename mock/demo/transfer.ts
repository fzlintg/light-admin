import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const guangdong = [
  {
    label: '珠海市',
    value: '1',
    key: '1',
  },
  {
    label: '深圳市',
    value: '2',
    key: '2',
  },
  {
    label: '广州市',
    value: '3',
    key: '3',
  },
];

export default [
  {
    url: '/basic-api/select/transfer',
    timeout: 1000,
    method: 'get',
    response: ({}) => {
      return resultSuccess(guangdong);
    },
  },
] as MockMethod[];
