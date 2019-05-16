import React from 'react';
import JobCards from './components/JobCards.jsx';
import Applied from './components/Applied.jsx';
import AboutMe from './components/AboutMe.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'jobs',
      jobsList: [],
      currentJob: [],
      error: false,
      hasMore: true,
      isLoading: false,
      currentResults: 0
    };
    window.onscroll = () => {
      const {
        getScrapedJobs,
        state: {
          error,
          isLoading,
          hasMore
        },
    } = this
    if (error || isLoading || !hasMore) return;
    if ( document.documentElement.scrollHeight - document.documentElement.scrollTop
      <= document.documentElement.clientHeight) {
      this.setState({currentResults: this.state.currentResults+1});
      getScrapedJobs();
    }
    this.setCurrentJob = this.setCurrentJob.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleAppliedSubmit = this.handleAppliedSubmit.bind(this);
    this.getScrapedJobs = this.getScrapedJobs.bind(this);
    }
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
  
  handleAppliedSubmit() {
    const {job_id, site} = this.state.currentJob;
    $.ajax({
      method: 'POST',
      context: this,
      url: `${window.location.href}id/${job_id}/site/${site}`,
      data: (this.state.currentJob),
      success: function(data) {
        // feature to display status if successful or already applied
        $.ajax({
          method: 'GET',
          context: this,
          url: `${window.location.href}jobs`,
          data: {page: this.state.currentResults},
          success: function(data) {
            this.setState({
              jobsList: data,
              isLoading: false,
              hasMore: this.state.jobsList.length < 100
            });
          } 
        });
      } 
    });
  }

  getScrapedJobs() {
    $.ajax({
      method: 'GET',
      context: this,
      url: `${window.location.href}jobs`,
      data: {page: this.state.currentResults},
      success: function(data) {
        this.setState({
          jobsList: this.state.jobsList.concat(data),
          isLoading: false,
          hasMore: this.state.jobsList.length < 100
        });
      } 
    });
  }
  
  componentDidMount() {
    this.getScrapedJobs();
  }

  render() {
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
            ? <JobCards jobsList={this.state.jobsList} onClick={(e) => {this.setCurrentJob(e);}}/>
            : this.state.view ==='applied' 
            ? <Applied onClick={(e) => {this.setCurrentJob(e);}}/>
            : <AboutMe/>
          }
        </div>
      </div>
    )
  }
}

export default App;
