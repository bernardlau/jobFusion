import React from 'react';
import Modal from './Modal.jsx';

const modalStyle = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	}
};

const mainStyle = {
	app: {
		margin: "120px 0"
	},
	button: {
		width: 150,
		padding: "12px 20px",
		color: "#fff",
		border: 0,
		margin: "0 auto",
		display: "block",
		backgroundColor: "#37d6c1",
		borderRadius: 3
	}
};

class Applied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: [],
      isModalOpen: false,
      isInnerModalOpen: false,
      currentJobInfo: [],
      notes: "",
      status: "rejected"
    }
    this.getAppliedJobs = this.getAppliedJobs.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getAppliedJobInfo = this.getAppliedJobInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  closeModal() {
		this.setState({
			isModalOpen: false
		});
	}
	openModal() {
		this.setState({
			isModalOpen: true
		});
  }
  getAppliedJobInfo(currentJob) {
    var state = this;
    $.ajax({
      method: 'GET',
      url: `${window.location.href}appliedJob`,
      data: JSON.parse(currentJob),
      success: function(data) {
        state.setState({
          currentJobInfo: data
        });
      } 
    });
  }
  onClick(e) {
    this.props.onClick(e);
    this.getAppliedJobInfo(e.currentTarget.getAttribute('value'));
    this.openModal();
  }
  handleChange(e) {
    const target = e.target;
    const value = target.type === 'dropdown' ? target.status : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    var state = this;
    const {job_id, site} = this.state.currentJobInfo[0];
    $.ajax({
      method: 'PUT',
      url: `${window.location.href}appliedJob`,
      data: {job_id: job_id, site: site, notes: this.state.notes, status: this.state.status},
      success: function(data) {
        state.getAppliedJobs();
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
                <tr key={job.job_id} onClick={this.onClick} value={JSON.stringify(job)}>
                  <td><a href={job.href.replace(/[$]([1-9][0-9][0-9]|[1-9][0-9]|[0-9])|[?]([1-9][0-9][0-9]|[1-9][0-9]|[0-9])/g, "?")} target="_blank">{job.title}</a></td>
                  <td>{job.subtitle}</td>
                  <td>{job.date_applied.substring(0, job.date_applied.length-5).replace(/[T]/," ")}</td>
                  <td>{job.status}</td>
                  <td>{job.site}</td>
                </tr>
              ))}
            </tbody>
        </table>
        <Modal
					isModalOpen={this.state.isModalOpen}
					closeModal={this.closeModal}
					style={modalStyle}
				>
          <div className="modal-jobs">
            {this.state.currentJobInfo.map((job) => {
              return (
                <div className="modal-job-row shadow" key={job.job_id}>
                  <h3 className="modal-job-data"><a href={job.href.replace(/[$]([1-9][0-9][0-9]|[1-9][0-9]|[0-9])|[?]([1-9][0-9][0-9]|[1-9][0-9]|[0-9])/g, "?")} target="_blank">{job.title}</a></h3>
                  <div className="modal-job-data subtitle">{job.subtitle}</div>
                  <div className="modal-job-data">Date Applied: {job.date_applied.substring(0, job.date_applied.length-5).replace(/[T]/," ")}</div>
                  <div className="modal-job-data">Status: {job.status}</div>
                  <div className="modal-job-data metadata">More Information: {job.metadata}</div>
                  <div className="modal-job-data">Job Description: {job.description}</div>
                  <div className="modal-job-data">Notes: {job.notes}</div>
                </div>
              );
            })}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Change status:
              <select name="status" type="dropdown" status={this.state.status} onChange={this.handleChange}>
                <option value="rejected">Rejected</option>
                <option value="screening">Phone screen</option>
                <option value="onsite">Onsite</option>
                <option value="offer">Offer</option>
                <option value="new">New</option>
              </select>
            </label>
            <label>
              Update Notes:
              <textarea name="notes" type="notes" value={this.state.notes} onChange={this.handleChange}/>
            </label>
            <button
              style={{
                ...mainStyle.button,
                margin: 0,
                width: "auto",
                marginTop: 10
              }}
              onClick={this.closeModal}
            >Update</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default Applied;