import React from 'react';
import RandomFontSpan from './TitleAnimated'
import { FidgetSpinner as Loading } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randFonts: this.getRandomFonts(),
      isLoading: this.props.loading
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
    this.changeFontInterval = setInterval(() => {
      this.setState({
        randFonts: this.getRandomFonts(),
      });
    }, 350);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading === true) {
      if (this.props.loading === false) {
        clearInterval(this.changeFontInterval);
        this.setState({
          isLoading: false,
          randFonts: [
            'inherit',
            'inherit',
            'inherit',
            'inherit',
            'inherit'
          ]
        })
      }
    }
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


    if (this.state.redirect) { return (<Navigate to="/profile" />) }
    else if (this.state.isLoading) return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#FF8C00',
        color: '#fff',
        height: '50px',
        width: '100vw',
        position: 'fixed',
        zIndex: '100',
      }}>
        <div style={{
          fontSize: '1.5em',
          textAlign: 'center',
        }}>
          {
            this.state.randFonts.map((font, index) => {
              return <RandomFontSpan key={index} fontFamily={font} text={"SPEAR"[index]} />
            })
          }
        </div>
      </div>)
    else return (
      <div style={{
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
      }}>
        <div>
          <span
            style={{
              color: '#fff',
              marginRight: '15px',
              cursor: 'pointer',
            }}
            onClick={() => this.props.createNovel()}
          >New Novel</span>
        </div>
        <div style={{
          fontSize: '1.5em',
        }}>
          {
            this.state.randFonts.map((font, index) => {
              return <RandomFontSpan key={index} fontFamily={'inherit'} text={"SPEAR"[index]} />
            })
          }
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }} onClick={() => { this.setState({ redirect: true }) }}>
          <span style={{
            marginRight: '2vw',
          }}>
            {this.props.user}
          </span>
        </div>
      </div>
    );
  }
}

export default Navbar;
