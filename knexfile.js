var db = require('./config').development;

module.exports = {
  development: {
    client: 'pg',
    connection: db,
    pool: {
      min: 5,
      max: 10
    },
    seeds: {
      directory: __dirname + '/knex/scrape/indeed'
    }
  },
  production: {
    client: 'pg',
    connection: db
  }
};
