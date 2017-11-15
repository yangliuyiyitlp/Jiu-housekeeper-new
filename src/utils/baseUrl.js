
let baseUrl

if (process.env === 'PRODUCTION') {
  baseUrl = 'http://0.0.0.0:8180'
} else if (process.env === 'TEST') {
  baseUrl = 'http://0.0.0.0:8180'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
