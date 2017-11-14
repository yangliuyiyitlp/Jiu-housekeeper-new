// let baseUrl = function (path) {
//   let url = ''
//   if (process.env === 'PRODUCTION') {
//     url = 'http://hk.99bicycle.com' + path
//   } else if (process.env === 'TEST') {
//     url = 'http://operateweb.99bicycle.com:8180' + path
//   } else {
//     url = 'http://localhost:3000' + path
//   }
//
//   return url
// }
// module.exports = baseUrl

let baseUrl

if (process.env === 'PRODUCTION') {
  baseUrl = 'http://hk.99bicycle.com'
} else if (process.env === 'TEST') {
  baseUrl = 'http://operateweb.99bicycle.com:8180'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
