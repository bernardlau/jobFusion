import React from 'react';

const JobCards = (props) => (
  <div className="jobs">
    {props.jobsList.map((job) => {
      return (
        <div className="job-row shadow" key={job.id}>
          <h3 className="job-data"><a href={job.href}>{job.title}</a></h3>
          <div className="job-data subtitle">{job.subTitle}</div>
          <div className="job-data metadata">{job.metadataHeader}</div>
          <div className="job-data">{job.description}</div>
        </div>
      );
    })}
  </div>
);

export default JobCards;