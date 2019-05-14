const knex = require('./knex');

var postAppliedJob = (jobInfo, cb) => {
  const {job_id, site} = jobInfo;
  return knex('appliedjobs')
  .insert({job_id: job_id, site: site})
  .then(() => {
    return knex('jobs')
    .where({job_id: job_id, site: site})
    .update('status', 'applied')
    .then((result) => {
      return cb(null, result);
    })
    .catch((error) => {
      return cb(error);
    });
  })
  .catch((error) => {
    return cb(error);
  });
}

var getAppliedJobs = (cb) => {
  return knex('appliedjobs')
  .join('jobs', 'appliedjobs.job_id', 'jobs.job_id')
  .select('jobs.title', 'jobs.subtitle', 'appliedjobs.date_applied', 'jobs.site', 'jobs.href', 'jobs.job_id', 'jobs.status')
  .orderBy('appliedjobs.date_applied', 'desc')
  .limit(20)
  .then((results) => {
    cb(null, results);
  })
  .catch((err) => {
    cb(err);
  })
}

var getScrapedJobs = (cb) => {
  return knex('jobs')
  .select('title', 'subtitle', 'description', 'metadata', 'site', 'href', 'job_id', 'datescraped')
  .orderBy('datescraped', 'desc')
  .where('status', 'new')
  .limit(18)
  .then((results) => {
    cb(null, results);
  })
  .catch((err) => {
    cb(err);
  })
}

module.exports = {postAppliedJob, getAppliedJobs, getScrapedJobs};