import React from 'react';

class Navbar extends React.Component {
  render() {
    const navbarStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#FF8C00',
      color: '#fff',
      height: '50px',
      position: 'sticky',
      width: '100vw',
      position: 'fixed', 
      zIndex: '100'
    };

    const brandStyle = {
      fontSize: '1.5em',
    };

    const navItemStyle = {
      color: '#fff',
      marginRight: '15px',
      cursor: 'pointer',
    };

    const userInfoStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const usernameStyle = {
      marginRight: '10px',
    };

    const avatarStyle = {
      borderRadius: '50%',
      marginRight: '2vw',
    };

    return (
      <div style={navbarStyle} className="navbar">
        <div className="nav-links">
          <span style={navItemStyle}>Note</span>
          <span style={navItemStyle}>Story</span>
          <span style={navItemStyle}>Novel</span>
        </div>
        <div style={brandStyle} className="brand">
          Spear
        </div>
        <div style={userInfoStyle} className="user-info">
          <span style={usernameStyle} className="username">
            Abhay Upadhyay
          </span>
          <img
            style={avatarStyle}
            src="https://via.placeholder.com/30"
            alt="User Avatar"
            className="avatar"
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
