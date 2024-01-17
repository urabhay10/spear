import React, { Component } from 'react'
import bookIconGrey from '../img/open-book-grey.svg';
import bookIconWhite from '../img/open-book-white.svg';
import brainIconGrey from '../img/brain-grey.svg';
import brainIconWhite from '../img/brain-white.svg';
import grammarIconGrey from '../img/grammar-grey.svg';
import grammarIconWhite from '../img/grammar-white.svg';
import alignCenterGrey from '../img/align-center-grey.svg';
import alignCenterWhite from '../img/align-center-white.svg';
import alignLeftGrey from '../img/align-left-grey.svg';
import alignLeftWhite from '../img/align-left-white.svg';
import alignRightGrey from '../img/align-right-grey.svg';
import alignRightWhite from '../img/align-right-white.svg';
import RandomFontSpan from './TitleAnimated';
import spear from '../img/spear.webp';
import {Watch as Loading} from 'react-loader-spinner'

export default class ActivityBarHorizontal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            tabsUnactive: [bookIconGrey, brainIconGrey, grammarIconGrey],
            tabsActive: [bookIconWhite, brainIconWhite, grammarIconWhite],
            isClickPending: false,
            activeAlign: 1,
            alignUnactive: [alignLeftGrey, alignCenterGrey, alignRightGrey],
            alignActive: [alignLeftWhite, alignCenterWhite, alignRightWhite],
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

    getRandomFonts() {
        return [
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
        ];
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
    handleAlignClick = (index) => {
        if (index === 0) {
            this.props.setAlign('left');
        } else if (index === 2) {
            this.props.setAlign('right');
        } else if (index === 1) {
            this.props.setAlign('center');
        }
        this.setState({ activeAlign: index });
    }
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
    render() {
        const verticalBarStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            width: '100vw',
            height: '40px',
            backgroundColor: '#000000',
            color: 'rgb(255, 255, 255)',
            position: 'fixed',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'space-around',
            top: '0px',
            zIndex: '100',
        };

        return (
            <>
                <div style={verticalBarStyle}>
                
                    {this.state.tabsActive.map((tab, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => this.handleTabClick(index)}
                                style={{
                                    width: '9%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderLeft: 'none',
                                }}
                            >
                                <img alt='' src={index === this.state.activeTab ? tab : this.state.tabsUnactive[index]} style={{ height: '80%', width: '80%', margin: '0% 10%', backgroundColor: this.state.activeTab === index ? '#222222' : 'transparent', top: "0" }} />
                            </div>
                        );
                    })}
                    {
                        window.innerWidth>768 && this.state.randFonts.map((font, index) => {
                            return <RandomFontSpan key={index} fontFamily={font} text={"SPEAR"[index]} />
                        })
                    }
                    {
                        window.innerWidth<=768 &&  this.props.loading && <div style={{
                            position: 'relative',
                            top: '0',
                        }}><Loading height={30} color='orange'/></div>
                    }
                    {
                        window.innerWidth<=768 && !this.props.loading && <img alt='' src={spear} style={{
                            height: '80%',
                            margin: '0% 10%',
                            backgroundColor: 'transparent',
                            top: "0"
                        }}/>
                    }
                    <div
                        onClick={() => this.handleAlignClick(0)}
                        style={{
                            width: '9%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderLeft: 'none',
                            marginLeft: '5%',
                        }}
                    >
                        <img alt='' src={this.state.activeAlign === 0 ? alignLeftWhite : alignLeftGrey} style={{ height: '80%', width: '80%', margin: '0% 10%', backgroundColor: this.props.align === 'left' ? '#222222' : 'transparent', top: "0" }} />
                    </div>
                    <div
                        onClick={() => this.handleAlignClick(1)}
                        style={{
                            width: '9%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderLeft: 'none',
                        }}
                    >
                        <img alt='' src={this.state.activeAlign === 1 ? alignCenterWhite : alignCenterGrey} style={{ height: '80%', width: '80%', margin: '0% 10%', backgroundColor: this.props.align === 'center' ? '#222222' : 'transparent', top: "0" }} />
                    </div>
                    <div
                        onClick={() => this.handleAlignClick(2)}
                        style={{
                            width: '9%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderLeft: 'none',
                        }}
                    >
                        <img alt='' src={this.state.activeAlign === 2 ? alignRightWhite : alignRightGrey} style={{ height: '80%', width: '80%', margin: '0% 10%', backgroundColor: this.props.align === 'right' ? '#222222' : 'transparent', top: "0" }} />
                    </div>
                </div >
            </>
        );
    }
}