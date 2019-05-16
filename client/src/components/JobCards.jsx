import React from 'react';
import SideMenu from './SideMenu.jsx';

class JobCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.sideToggle = this.sideToggle.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }
  handleDocumentClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.sideToggle();
  }

  sideToggle(e) {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleDocumentClick, false);
    } else {
      document.removeEventListener('click', this.handleDocumentClick, false);
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let sideStatus = this.state.isOpen ? 'isopen shadow' : '';
    return (
      <div className="jobs" ref={node => { this.node = node; }}>
      {this.props.jobsList.map((job) => {
        return (
          <div className="job-row shadow" key={job.job_id} value={JSON.stringify(job)} onClick={(e) => {this.props.onClick(e); this.sideToggle();}}>
            <h3 className="job-data"><a href={job.href.replace(/[$]([1-9][0-9][0-9]|[1-9][0-9]|[0-9])|[?]([1-9][0-9][0-9]|[1-9][0-9]|[0-9])/g, "?")} target="_blank">{job.title}</a></h3>
            <div className="job-data subtitle">{job.subtitle}</div>
            <div className="job-data metadata">{job.metadata}</div>
            <div className="job-data">{job.description}</div>
          </div>
        );
      })}
      <div className="sidemenu">
        <SideMenu sideStatus={sideStatus} onClick={() => {this.handleAppliedSubmit()}}/>
      </div>
    </div>
    
  )};
}

export default JobCards;