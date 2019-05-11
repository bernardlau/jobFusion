import React from 'react';

const JobCards = (props) => (
  <div className="jobs">
    {props.jobsList.map((job) => {
      return (
        <div className="job-row shadow" key={job.id} value={JSON.stringify(job)} onClick={props.onClick}>
          <h3 className="job-data"><a href={job.href}>{job.title}</a></h3>
          <div className="job-data subtitle">{job.subtitle}</div>
          <div className="job-data metadata">{job.metadataheader}</div>
          <div className="job-data">{job.description}</div>
        </div>
      );
    })}
  </div>
);

export default JobCards;