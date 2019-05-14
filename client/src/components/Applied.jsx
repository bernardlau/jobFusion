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
      isInnerModalOpen: false
    }
    this.getAppliedJobs = this.getAppliedJobs.bind(this);
    this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
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
                <tr key={job.job_id} onClick={this.openModal}>
                  <td><a href={job.href.replace(/[$][0-9]/g, "?")} target="_blank">{job.title}</a></td>
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
          
          <button
						style={{
							...mainStyle.button,
							margin: 0,
							width: "auto",
							marginTop: 10
						}}
						onClick={this.closeModal}
					>Close</button>
        </Modal>
      </div>
    )
  }
}

export default Applied;