import React from 'react';

class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutme: []
    }
    this.getAboutMe = this.getAboutMe.bind(this);
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

  componentDidMount() {
    this.getAboutMe();
  }

  render() {
    return (
      <div className="aboutme">
        {this.state.aboutme.map((about) => {
          return (
            <div className="aboutme-row shadow" key={about.linkedin}>
              <div className="aboutme-data">{about.linkedin}</div>
              <div className="aboutme-data">{about.portfolio}</div>
              <div className="aboutme-data">{about.github}</div>
              <div className="aboutme-data">{about.education}</div>
            </div>
          );
        })}
      </div>
    )
  }
}

export default AboutMe;