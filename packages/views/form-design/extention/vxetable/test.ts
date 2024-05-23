async function test({ page, sorts, filters, form }, { axios }) {
  const queryParams = Object.assign({}, form);
  const firstSort = sorts[0];
  if (firstSort) {
    queryParams.sort = firstSort.field;
    queryParams.order = firstSort.order;
  }
  filters.forEach(({ field, values }) => {
    queryParams[field] = values.join(',');
  });
  return await axios.post({ url: '/basic-api/vxe/getTableData', params: { queryParams, page } });
}
