import React from 'react';

class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutme: []
    }
    this.getAboutMe = this.getAboutMe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getAboutMe() {
    var state = this;
    $.ajax({
      method: 'GET',
      url: `${window.location.href}aboutme`,
      success: function(data){
        state.setState({
          aboutme: data
        });
      } 
    });
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: `${window.location.href}aboutme`,
      success: function(data) {
        console.log("successfully posted to db");
      } 
    });
  }

  componentDidMount() {
    this.getAboutMe();
  }

  render() {
    var aboutme = this.state.aboutme;
    return (
      <form className="jobs-applied" onSubmit={this.handleSubmit}>
        <label>LinkedIn: {aboutme.linkedin} 
          <input name="linkedin" onChange={this.handleChange} />
        </label>
        <label>Website: {aboutme.portfolio}
          <input name="portfolio" onChange={this.handleChange} />
        </label>
        <label>github: {aboutme.github}
          <input name="github" onChange={this.handleChange} />
        </label>
        <label>keywords: {aboutme.keywords}
          <input name="keywords" onChange={this.handleChange} />
        </label>
        <label>education: {aboutme.education}
          <input name="education" onChange={this.handleChange} />
        </label>
        <label>educationyear: {aboutme.educationyear}
          <input name="educationyear" onChange={this.handleChange} />
        </label>
        <label>jobonetitle: {aboutme.jobonetitle}
          <input name="jobonetitle" onChange={this.handleChange} />
        </label>
        <label>joboneyear: {aboutme.joboneyear}
          <input name="joboneyear" onChange={this.handleChange} />
        </label>
        <label>jobonedescription: {aboutme.jobonedescription}
          <input name="jobonedescription" onChange={this.handleChange} />
        </label>
        <label>jobtwotitle: {aboutme.jobtwotitle}
          <input name="jobtwotitle" onChange={this.handleChange} />
        </label>
        <label>jobtwoyear: {aboutme.jobtwoyear}
          <input name="jobtwoyear" onChange={this.handleChange} />
        </label>
        <label>jobtwodescription: {aboutme.jobtwodescription}
          <input name="jobtwodescription" onChange={this.handleChange} />
        </label>
        <button>Update</button>
      </form>
    )
  }
}

export default AboutMe;