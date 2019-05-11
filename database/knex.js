var db = require('../config').development;

module.exports = {
  development: {
    client: 'pg',
    connection: db
  },
  production: {
    client: 'pg',
    connection: db
  }
};
