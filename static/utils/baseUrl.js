let baseUrl

if (process.env === 'PRODUCTION') {
  baseUrl = 'http://hk.99bicycle.com'
} else if (process.env === 'TEST') {
  baseUrl = 'http://139.196.194.172:3000'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
