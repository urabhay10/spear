import React from 'react';
import bookIconGrey from '../img/open-book-grey.png';
import bookIconWhite from '../img/open-book-white.png';
import brainIconGrey from '../img/brain-grey.svg';
import brainIconWhite from '../img/brain-white.svg';
import grammarIconGrey from '../img/grammar-grey.svg';
import grammarIconWhite from '../img/grammar-white.svg';

class VerticalBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabsUnactive: [bookIconGrey, brainIconGrey, grammarIconGrey],
      tabsActive: [bookIconWhite, brainIconWhite, grammarIconWhite],
      isClickPending: false,
    };
  }

  handleTabClick = (index) => {
    if (this.state.isClickPending) {
      return;
    }
    this.setState({ isClickPending: true })
    setTimeout(() => {
      this.setState({ isClickPending: false });
    }, 300);
    if (index === this.state.activeTab) {
      this.props.setActiveBoard('');
      this.setState({ activeTab: -1 });
    } else {
      if (index === 0) {
        this.props.setActiveBoard('story');
      } else if (index === 2) {
        this.props.setActiveBoard('grammar');
        this.props.getGrammarErrors();
      } else if (index === 1) {
        this.props.setActiveBoard('ai');
      }
      this.setState({ activeTab: index });
    }
  };

  render() {
    const verticalBarStyle = {
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      width: '4vw',
      height: '100vh',
      backgroundColor: '#000000',
      color: 'rgb(255, 255, 255)',
      position: 'fixed',
      flexWrap: 'nowrap',
      alignContent: 'flex-start',
      justifyContent: 'flex-start',
      top: '70px',
      paddingTop: '10px',
    };

    return (
      <div style={verticalBarStyle}>
        {this.state.tabsActive.map((tab, index) => {
          return (
            <div
              key={index}
              onClick={() => this.handleTabClick(index)}
              style={{
                width: '100%',
                height: '10vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                borderLeft: index === this.state.activeTab ? '5px solid orange' : 'none',
              }}
            >
              <img alt='' src={index === this.state.activeTab ? tab : this.state.tabsUnactive[index]} style={{ height: '80%', width: '80%', margin: '10%' }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default VerticalBar;
