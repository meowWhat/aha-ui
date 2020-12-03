const path = require('path')
const { override, addLessLoader, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addLessLoader(),
  addWebpackAlias({
    src: path.resolve(__dirname, 'src'),
  })
)
