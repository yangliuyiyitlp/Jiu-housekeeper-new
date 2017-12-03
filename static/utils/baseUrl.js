let baseUrl

<<<<<<< HEAD
if (process.env.NODE_ENV === 'PRODUCTION') {
  baseUrl = 'http://hk.99bicycle.com'
} else if (process.env.NODE_ENV === 'TEST') {
=======
// if (process.env === 'PRODUCTION') {
if (process.env === 'production') {
  baseUrl = 'http://hk.99bicycle.com'
// } else if (process.env === 'TEST') {
} else if (process.env === 'test') {
>>>>>>> b24830bbd008ea737fb0378fbcefb5068ded0a74
  baseUrl = 'http://139.196.194.172:3000'
} else {
  baseUrl = 'http://localhost:3000'
}

module.exports = baseUrl
