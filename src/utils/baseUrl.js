let baseUrl

if (process.env === 'PRODUCTION') {
  baseUrl = 'http://hk.99bicycle.com'
} else if (process.env === 'TEST') {
  baseUrl = 'http://operateweb.99bicycle.com:8180'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
