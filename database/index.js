const config = require('./knex').development;
const knex = require('knex')(config);

var postAppliedJob = (jobInfo, cb) => {
  const {id, href, description, subtitle, metadataheader, title, site} = jobInfo;
  return knex('appliedjobs')
  .insert({job_id: id, href: href, description: description, 
          subtitle: subtitle, metadata: metadataheader, title: title, site: site})
  .then((result) => {
    return cb(null, result);
  })
  .catch((error) => {
    return cb(error);
  });
}

var getAppliedJobs = (cb) => {
  return knex('appliedjobs')
  .select('title', 'subtitle', 'date_applied', 'site')
  .orderBy('date_applied')
  .then((results) => {
    cb(null, results);
  })
  .catch((err) => {
    cb(err);
  })
}

module.exports = {postAppliedJob, getAppliedJobs};