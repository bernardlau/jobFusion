const config = require('./knex').development;
const knex = require('knex')(config);

var postAppliedJob = (jobInfo, cb) => {
  const {id, href, description, subtitle, metadata, title, site} = jobInfo;
  return knex('appliedjobs')
  .insert({job_id: id, href: href, description: description, 
          subtitle: subtitle, metadata: metadata, title: title, site: site})
  .then((result) => {
    return cb(null, result);
  })
  .catch((error) => {
    return cb(error);
  });
}

module.exports = {postAppliedJob};