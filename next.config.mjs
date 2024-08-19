// next.config.mjs
import transpileModules from 'next-transpile-modules';

const withTM = transpileModules([
  '@ant-design/icons',
  'rc-util',
  'rc-pagination',
  'rc-picker', // Transpile rc-picker
  'antd',      // Include antd for full coverage
]);

export default withTM({
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
});
