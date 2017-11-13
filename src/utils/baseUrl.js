let baseUrl = function (path) {
  let url = ''
  if (process.env === 'PRODUCTION') {
    url = 'http://0.0.0.0:8180' + path
  } else if (process.env === 'TEST') {
    url = 'http://0.0.0.0:8180' + path
  } else {
    url = 'http://localhost:3000' + path
  }

  return url
}
// let baseUrl = function (path) {
//   let url = 'http://0.0.0.0:8180' + path
//   return url
// }

module.exports = baseUrl
