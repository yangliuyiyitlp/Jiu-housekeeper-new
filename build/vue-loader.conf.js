let utils = require('./utils')
let config = require('../config')
let isProduction = process.env.NODE_ENV === 'production'

let loaders = utils.cssLoaders({
  sourceMap: isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap,
  extract: isProduction,
})

loaders['i18n'] = '@kazupon/vue-i18n-loader'

module.exports = {
  preLoaders: {
    i18n: 'yaml-loader'
  },
  postcss: [
    require('postcss-px2rem')({remUnit: 15}),
  ],
  loaders: loaders
}
