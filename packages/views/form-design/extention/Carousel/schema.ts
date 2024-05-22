export default {
  label: '走马灯',
  type: 'container',
  icon: 'ant-design:one-to-one-outlined',
  componentProps: {
    onAfterChange__func: ` console.log(current);`,
    onAfterChange__params: ['current'],
    autoplay: true,
    dots: true,
    dotPosition: 'bottom',
    background: '#b9bcdf',
    height: '400px',
    easing: 'scrollx',
  },
  children: [],
  required: true,
};
