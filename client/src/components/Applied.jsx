import React from 'react';

class Applied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: []
    }
    this.getAppliedJobs = this.getAppliedJobs.bind(this);
  }
  getAppliedJobs() {
    var state = this;
    $.ajax({
      method: 'GET',
      url: `${window.location.href}applied/jobs`,
      success: function(data){
        state.setState({
          applied: data
        });
      } 
    });
  }
  componentDidMount() {
    this.getAppliedJobs();
  }

  render() {
    return (
      <div className="jobs-applied">
        {this.state.applied.map((job) => (
          <div className="applied-row shadow" key={job.job_id}>
            <h3 className="applied-data"><a href={job.href}>{job.title}</a></h3>
            <div className="applied-data subtitle">{job.subtitle}</div>
            <div className="applied-data">{job.date_applied}</div>
            <div className="applied-data">{job.site}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default Applied;