const knex = require('./knex');

var postAppliedJob = (jobInfo, cb) => {
  return knex('appliedjobs')
  .insert(jobInfo)
  .then(() => {
    return knex('jobs')
    .where(jobInfo)
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

var getScrapedJobs = (page, cb) => {
  return knex('jobs')
  .select('title', 'subtitle', 'description', 'metadata', 'site', 'href', 'job_id', 'datescraped')
  .where('status', 'new')
  .limit(18)
  .offset(page*18)
  .then((results) => {
    cb(null, results);
  })
  .catch((err) => {
    cb(err);
  });
}

var getAppliedJobInfo = (currentJob, cb) => {
  return knex('appliedjobs')
  .join('jobs', 'appliedjobs.job_id', '=', 'jobs.job_id')
  .select('jobs.title', 'jobs.subtitle', 'appliedjobs.date_applied', 'jobs.site', 'jobs.href', 'jobs.job_id', 'jobs.status', 'appliedjobs.notes', 'jobs.description')
  .where('appliedjobs.job_id', currentJob.job_id)
  .andWhere('appliedjobs.site', currentJob.site)
  .then((results) => {
    cb(null, results);
  })
  .catch((err) => {
    cb(err);
  });
}

var updateAppliedJobInfo = (currentJob, cb) => {
  return knex('appliedjobs')
  .update({notes: currentJob.notes})
  .where('appliedjobs.job_id', currentJob.job_id)
  .andWhere('appliedjobs.site', currentJob.site)
  .then(() => {
    return knex('jobs')
    .update({status: currentJob.status})
    .where('jobs.job_id', currentJob.job_id)
    .andWhere('jobs.site', currentJob.site)
    .then((results) => {
      cb(null, results);
    })
    .catch((err) => {
      cb(err);
    });
  })
  .catch((err) => {
    cb(err);
  });
}


module.exports = {postAppliedJob, getAppliedJobs, getScrapedJobs, getAppliedJobInfo, updateAppliedJobInfo};