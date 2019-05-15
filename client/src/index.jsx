import React from 'react';
import JobCards from './components/JobCards.jsx';
import SideMenu from './components/SideMenu.jsx';
import Applied from './components/Applied.jsx';
import AboutMe from './components/AboutMe.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'jobs',
      isOpen: false,
      jobsList: [],
      currentJob: []
    }
    this.setCurrentJob = this.setCurrentJob.bind(this);
    this.changeView = this.changeView.bind(this);
    this.sideToggle = this.sideToggle.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleAppliedSubmit = this.handleAppliedSubmit.bind(this);
    this.getScrapedJobs = this.getScrapedJobs.bind(this);
  }
  setCurrentJob(e) {
    this.setState({
      currentJob: JSON.parse(e.currentTarget.getAttribute('value'))
    });
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  handleDocumentClick(e) {
    if (this.state.isOpen === true) {
      this.setState({
        isOpen: false
      });
    };
  }

  sideToggle(e) {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleAppliedSubmit() {
    const {job_id, site} = this.state.currentJob;
    var state = this;
    $.ajax({
      method: 'POST',
      url: `${window.location.href}id/${job_id}/site/${site}`,
      data: (this.state.currentJob),
      success: function(data) {
        // feature to display status if successful or already applied
        state.getScrapedJobs(state);
      } 
    });
  }

  getScrapedJobs(state) {
    $.ajax({
      method: 'GET',
      url: `${window.location.href}jobs`,
      data: (this.state.currentJob),
      success: function(data) {
        state.setState({
          jobsList: data
        });
      } 
    });
  }
  
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, true);
    this.getScrapedJobs(this);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  render() {
    let sideStatus = this.state.isOpen ? 'isopen shadow' : '';
    return (
      <div>
        <div className="main">
          <div className='nav'>
            <ul>
              <li 
                className={this.state.view === 'jobs' ? 'nav-selected' : 'nav-unselected'}
                onClick={() => this.changeView('jobs')}>
                Jobs
              </li>
              <li 
                className={this.state.view === 'applied' ? 'nav-selected' : 'nav-unselected'}
                onClick={() => this.changeView('applied')}>
                Applied
              </li>
              <li 
                className={this.state.view === 'aboutMe' ? 'nav-selected' : 'nav-unselected'}
                onClick={() => this.changeView('aboutMe')}>
                About Me
              </li>
            </ul>
          </div>
          {this.state.view === 'jobs'
            ? <JobCards jobsList={this.state.jobsList} isOpen={this.state.isOpen} onClick={(e) => {this.sideToggle(e); this.setCurrentJob(e);}}/>
            : this.state.view ==='applied' 
            ? <Applied onClick={(e) => {this.setCurrentJob(e);}}/>
            : <AboutMe/>
          }
          <div className="sidemenu">
            <SideMenu sideStatus={sideStatus} onClick={() => {this.handleAppliedSubmit()}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
