import React, { Component } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default class GrammarBoard extends Component {
    handleRefresh = () => {
        this.props.getGrammarErrors();
    }
    render() {
        const { correctedText} = this.props;
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
                        height: '10vh',
                    }}
                >
                    <div
                        style={{
                            width: '90%',
                            height: '10vh',
                            textAlign: 'center',
                        }}
                    >
                        Spelling Review
                    </div>
                    <div
                        style={{
                            width: '10%',
                            height: '10vh',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={this.handleRefresh}
                    >
                        <FiRefreshCw size={20} />
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        height: 'fit-content',
                        textAlign: 'left',
                        paddingLeft: '10px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {correctedText.toString()}
                </div>
                
            </div>
        );
    }
}
