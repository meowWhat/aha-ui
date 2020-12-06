const path = require('path')
const { override, addLessLoader, addWebpackAlias, fixBabelImports } = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    src: path.resolve(__dirname, 'src'),
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'less',
  }),
  addLessLoader(),
)
