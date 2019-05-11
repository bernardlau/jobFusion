import React from 'react';

class Applied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: ['sample']
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
    return(
    <div>
      {this.state.applied.map((job) => (
          <div className="job-row shadow">
            <h3 className="job-data"><a>{job.title}</a></h3>
            <div className="job-data subtitle">{job.subtitle}</div>
            <div className="job-data">{job.date_applied}</div>
          </div>
        )
      )}
    </div>
    )
  }
}

export default Applied;