let baseUrl

if (process.env.NODE_ENV === 'PRODUCTION') {
  baseUrl = 'http://hk.99bicycle.com'
} else if (process.env.NODE_ENV === 'TEST') {
  baseUrl = 'http://139.196.194.172:3000'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
