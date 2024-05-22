import { resultSuccess } from '../_util';
import { MockMethod } from 'vite-plugin-mock';

const printColumns = [
  { field: 'name' },
  { field: 'email' },
  { field: 'nickname' },
  { field: 'age' },
  { field: 'amount' },
];

export default [
  {
    url: '/basic-api/vxe/getVxeColumn',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      return resultSuccess({ printColumns });
    },
  },
] as MockMethod[];
