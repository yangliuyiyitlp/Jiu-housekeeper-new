let baseUrl
//
// if (process.env.NODE_ENV === 'production') {
//   baseUrl = 'http://hk.99bicycle.com'
// } else if (process.env.NODE_ENV === 'test') {
//   baseUrl = 'http://139.196.194.172:3000'
// } else {
//   baseUrl = 'http://localhost:3000'
// }

// 生产 固定
// baseUrl = 'http://hk.99bicycle.com'
// 测试
// baseUrl = 'http://139.196.194.172:3000'
// 开发
// baseUrl = 'http://localhost:3000'

// 系统重构后
baseUrl = require('./baseUrl-dev.json')
// baseUrl = require('./baseUrl-test.json')
// baseUrl = require('./baseUrl-prod.json')
module.exports = baseUrl
