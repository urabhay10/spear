import React from 'react';
import RandomFontSpan from './TitleAnimated'
import { FidgetSpinner as Loading } from 'react-loader-spinner'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randFonts: this.getRandomFonts(),
      isLoading: true
    };
  }
  fonts = [
    'Kirang Haerang',
    'Indie Flower',
    'Rye',
    'Amatic SC',
    'Bangers',
    'Fredericka the Great'
  ];

  componentDidMount() {
    const changeFontInterval = setInterval(() => {
      this.setState({
        randFonts: this.getRandomFonts(),
      });
    }, 350);
    setTimeout(() => {
      clearInterval(changeFontInterval);
      this.setState({
        randFonts: ['inherit', 'inherit', 'inherit', 'inherit', 'inherit'],
        isLoading: false
      });
    }, 2800);
  }
  getRandomFonts() {
    return [
      this.fonts[Math.floor(Math.random() * this.fonts.length)],
      this.fonts[Math.floor(Math.random() * this.fonts.length)],
      this.fonts[Math.floor(Math.random() * this.fonts.length)],
      this.fonts[Math.floor(Math.random() * this.fonts.length)],
      this.fonts[Math.floor(Math.random() * this.fonts.length)],
    ];
  }
  render() {
    const navbarStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#FF8C00',
      color: '#fff',
      height: '50px',
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
    if (this.state.isLoading) return (
      <div style={navbarStyle} className="navbar">
        <Loading
          ballColors={['orange', 'orange','orange']}
          backgroundColor={'white'}
          height={70}
          width={100}
        />
        <div style={brandStyle} className="brand">
          {
            this.state.randFonts.map((font, index) => {
              return <RandomFontSpan key={index} fontFamily={font} text={"SPEAR"[index]} />
            })
          }
        </div>
        <Loading
          ballColors={['orange', 'orange','orange']}
          backgroundColor={'white'}
          height={70}
          width={100}
        />
      </div>)
    else return (
      <div style={navbarStyle} className="navbar">
        <div className="nav-links">
          <span style={navItemStyle}>Note</span>
          <span style={navItemStyle}>Story</span>
          <span style={navItemStyle}>Novel</span>
        </div>
        <div style={brandStyle} className="brand">
          {
            this.state.randFonts.map((font, index) => {
              return <RandomFontSpan key={index} fontFamily={'inherit'} text={"SPEAR"[index]} />
            })
          }
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
