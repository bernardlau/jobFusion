import React from 'react';

const JobCards = (props) => (
  <div>
    <h1>Jobs</h1>
    <div className="jobs">
      <div className="job-table">
        {props.jobsList.map((job) => {
          return (
            <div className="job-row" key={job.id}>
              <div className="job-data"><a href={job.href}>{job.title}</a></div>
              <div className="job-data">{job.subTitle}</div>
              <div className="job-data">{job.metadataHeader}</div>
              <div className="job-data">{job.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default JobCards;