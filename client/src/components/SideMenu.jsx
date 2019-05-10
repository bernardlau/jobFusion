import React from 'react';

const SideMenu = (props) => {
  return (
    <div className={props.sideStatus} id='menu'>
      <ul>
        <li><i className="fa fas fa-check" onClick={props.onClick}></i></li>
      </ul>
    </div>
  )
}

export default SideMenu;