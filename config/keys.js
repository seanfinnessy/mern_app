if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  // dev. require in and immediately export.
  module.exports = require('./dev');
}