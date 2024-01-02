import React, { Component } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default class GrammarBoard extends Component {
    handleRefresh = () => {
        this.props.getGrammarErrors();
    }
    
    render() {
        const { correctedText } = this.props;
        return (
            <div
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    display: 'flex',
                    width: '16vw',
                    height: '100vh',
                    backgroundColor: '#000000',
                    color: 'rgb(255, 255, 255)',
                    position: 'fixed',
                    flexWrap: 'nowrap',
                    alignContent: 'flex-start',
                    justifyContent: 'flex-start',
                    top: '70px',
                    paddingTop: '10px',
                    left: '4vw',
                    outline: 'white solid 1px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: 'fit-content',
                    }}
                >
                    <div
                        style={{
                            width: '90%',
                            height: 'fit-content',
                            textAlign: 'center',
                        }}
                    >
                        Spelling Review
                    </div>
                    <div
                        style={{
                            width: '10%',
                            height: 'fit-content',
                            textAlign: 'center',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                        onClick={this.handleRefresh}
                    >
                        <FiRefreshCw size={20} />
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    height: 'fit-content',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <button
                        style={{
                            width: '90%',
                            height: 'fit-content',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#FF8C00',
                            color: 'white',
                            border: 'none',
                            fontSize: '1em',
                            fontWeight: 'bold',
                        }}
                        onClick={() => { this.props.setText(correctedText.toString()) }}
                    >
                        Accept changes
                    </button>
                </div>
                <div
                    style={{
                        width: '100%',
                        height: 'fit-content',
                        textAlign: 'left',
                        paddingLeft: '10px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        marginTop: '10px'
                    }}
                >
                    {/* {correctedText.toString()} */}
                    {
                        correctedText && this.props.text
                            ? correctedText.toString().split(' ').map((word, index) => {
                                const originalTextWords = this.props.text.toString().split(' ');
                                return (
                                    <span
                                        style={{
                                            color:
                                                originalTextWords.length > index && word === originalTextWords[index]
                                                    ? 'white'
                                                    : 'red',
                                        }}
                                    >
                                        {word + ' '}
                                    </span>
                                );
                            })
                            : null 
                    }
                </div>
                
            </div>
        );
    }
}
