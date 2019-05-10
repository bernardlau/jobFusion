import React from 'react';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [{
        text: 'Applied'
      }]
    }
  }
  render() {
    return (
        <div className={this.props.sideStatus} id='menu'>
          <ul>
            <li><i className="fa fas fa-check"></i></li>
          </ul>
        </div>
    )
  }
}

export default SideMenu;