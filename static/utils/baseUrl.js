let baseUrl

// if (process.env === 'PRODUCTION') {
if (process.env === 'production') {
  baseUrl = 'http://hk.99bicycle.com'
// } else if (process.env === 'TEST') {
} else if (process.env === 'test') {
  baseUrl = 'http://139.196.194.172:3000'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
