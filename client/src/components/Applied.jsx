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
        <table>
          <thead>
            <tr>
              <th colSpan='5'>Applied Jobs</th>
            </tr>
            <tr>
              <th>Title</th>
              <th>SubTitle</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Site</th>
            </tr>
          </thead>
            <tbody>
              {this.state.applied.map((job) => (
                <tr key={job.job_id}>
                  <td><a href={job.href.replace(/[$][0-9]/g, "?")} target="_blank">{job.title}</a></td>
                  <td>{job.subtitle}</td>
                  <td>{job.date_applied.substring(0, job.date_applied.length-5).replace(/[T]/," ")}</td>
                  <td>{job.status}</td>
                  <td>{job.site}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    )
  }
}

export default Applied;