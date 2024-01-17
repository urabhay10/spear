import React, { Component } from 'react'
import { AiOutlineSend } from "react-icons/ai";
import ChatContainer from './ChatContainer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { TailSpin as Loading } from 'react-loader-spinner'

export default class AIChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFocused: false,
            prompt: '',
            responses: [],
            prompts: [],
            currentViewing: 0,
            loadingResponse: false
        };
        this.handleReviewClick = this.handleReviewClick.bind(this);
        this.handleContinueClick = this.handleContinueClick.bind(this);
        this.divRef = React.createRef();
    }
    handleReviewClick() {
        this.setState({ prompt: '/review' });
        this.getResponse();
    }
    handleContinueClick() {
        this.setState({ prompt: '/continue' });
        this.getResponse();
    }

    adjustDivHeight = () => {
        const div = this.divRef.current;
        if (div) {
            div.style.height = 'auto';
            div.style.height = `${div.scrollHeight}px`;
        }
    }
    handleInputChange = (e) => {
        if (this.state.loadingResponse) return;
        const text = this.divRef.current.value;
        this.setState({ prompt: text });
    }
    getResponse = async () => {
        if (this.state.loadingResponse) return;
        this.setState({ loadingResponse: true });
        const { prompt } = this.state;
        if (prompt === '') return;
        if (prompt === '/review') {
            const response = await fetch('https://spear-backend-ba92a9024732.herokuapp.com/ai/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    chapter: {
                        title: this.props.title,
                        content: this.props.content
                    }
                })
            })
            const responseText = await response.text();
            this.setState({ responses: [...this.state.responses, responseText], prompt: '', prompts: [...this.state.prompts, "Review of your chapter titled: " + this.props.title] });
            this.setState({ loadingResponse: false });
        } else if (prompt === '/continue') {
            const response = await fetch('https://spear-backend-ba92a9024732.herokuapp.com/ai/continue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    chapter: {
                        title: this.props.title,
                        content: this.props.content
                    }
                })
            })
            const responseText = await response.text();
            this.setState({ responses: [...this.state.responses, responseText], prompt: '', prompts: [...this.state.prompts, "Conitnuation of your chapter titled: " + this.props.title] });
            this.setState({ loadingResponse: false });
        }
        else {
            const response = await fetch('https://spear-backend-ba92a9024732.herokuapp.com/ai/textio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ prompt })
            })
            const responseText = await response.text();
            this.setState({ responses: [...this.state.responses, responseText], prompt: '', prompts: [...this.state.prompts, prompt] });
            this.setState({ loadingResponse: false });
        }
    }
    componentDidMount() {
        //on pressing enter key
        document.addEventListener('keydown', (e) => {
            if (this.state.loadingResponse) return;
            if (e.key === 'Enter') {
                this.getResponse();
            }
        })
    }
    renderSuggestions = () => {
        if (this.state.loadingResponse) return;
        return (
            <div style={{
                position: 'absolute',
                top: '60px',
                width: '100%',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                zIndex: '100',
                textAlign: 'center',
            }}
            >
                Commands
                <div
                    style={{
                        border: 'solid white 1px',
                        backgroundColor: '#ff8c00',
                        width: '88%',
                        margin: 'auto',
                        marginTop: '0px'
                    }}
                >
                    /review - Reviews your chapter
                </div>
                <div
                    style={{
                        border: 'solid white 1px',
                        backgroundColor: '#ff8c00',
                        width: '88%',
                        margin: 'auto',
                        marginTop: '10px'
                    }}
                >
                    /continue - Continues your chapter
                </div>
            </div>
        );
    };

    render() {
        return (
            <div style={{
                flexDirection: 'column',
                alignItems: 'center',
                display: 'flex',
                width: window.innerWidth < 768 ? '100vw' : "20vw",
                height: '100vh',
                backgroundColor: '#000044',
                color: 'rgb(255, 255, 255)',
                position: 'fixed',
                flexWrap: 'nowrap',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                top: '40px',
                paddingTop: '10px',
                left: '0',
                outline: 'white solid 1px',
                overflowY: 'scroll',
            }}>
                <div style={{
                    width: '100%',
                    borderBottom: '1px solid white',
                    height: 'fit-content',
                    textAlign: 'center',
                    lineHeight: '100%'
                }}>Chat with Gemini</div>

                <div style-={{
                    width: '100%',
                    height: 'fit-content',
                    textAlign: 'center',
                }}>
                    {this.state.currentViewing !== 0 && <span style={{
                        left: 0,
                        position: 'absolute',
                        cursor: 'pointer'
                    }}
                        onClick={() => this.setState({ currentViewing: this.state.currentViewing - 1 >= 0 ? this.state.currentViewing - 1 : this.state.currentViewing })}
                    >
                        <FaArrowLeft />
                    </span>}
                    {this.state.currentViewing !== this.state.prompts.length ? <span>{this.state.currentViewing + 1}/{this.state.prompts.length}</span> : <span>Ask a question</span>}
                    {this.state.currentViewing !== this.state.prompts.length ? <span style={{
                        right: 0,
                        position: 'absolute',
                        cursor: 'pointer'
                    }}
                        onClick={() => this.setState({ currentViewing: this.state.currentViewing >= this.state.prompts.length ? this.state.currentViewing : this.state.currentViewing + 1 })}

                    ><FaArrowRight /></span> : <></>}
                </div>
                {this.state.currentViewing !== this.state.prompts.length && <><div className="sent-chat">
                    <ChatContainer text={this.state.prompts[this.state.currentViewing]} prompt />
                </div>
                    <div className="received-chat" style={{
                        paddingBottom: '70px'
                    }}>
                        <ChatContainer text={this.state.responses[this.state.currentViewing]} />
                    </div></>}

                {this.state.currentViewing === this.state.prompts.length && <><textarea style={{
                    width: window.innerWidth < 768 ? '90%' : '17%',
                    color: 'rgb(255, 255, 255)',
                    border: 'none',
                    outline: 'none',
                    borderBottom: 'white solid 1px',
                    fontSize: '0.9em',
                    position: 'fixed',
                    bottom: '1px',
                    left: '0',
                    backgroundColor: !this.state.inputFocused ? 'rgb(0, 0, 68)' : 'rgb(0, 0, 34)',
                    resize: 'none',
                    maxHeight: '50vh',
                }}
                    ref={this.divRef}
                    value={this.state.prompt}
                    onFocus={() => this.setState({ inputFocused: true })}
                    onInput={() => {
                        if (this.state.loadingResponse) return;
                        else { this.handleInputChange(); this.adjustDivHeight() }
                    }}
                    onBlur={() => this.setState({ inputFocused: false })}
                />
                    {
                        this.state.inputFocused && this.renderSuggestions()
                    }
                    <div onClick={() => {
                        if (this.state.loadingResponse) return;
                        this.getResponse()
                    }}>
                        {!this.state.loadingResponse && <AiOutlineSend style={{
                            position: 'fixed',
                            bottom: '0px',
                            left: window.innerWidth < 768 ? '87vw' : '17vw',
                            color: 'rgb(255, 255, 255)',
                            fontSize: '1.7em',
                            cursor: 'pointer'
                        }} />}
                        {
                            this.state.loadingResponse && <Loading style={{
                                position: 'fixed',
                                bottom: '0px',
                                left: '17vw',
                                color: 'rgb(255, 255, 255)',
                                fontSize: '1.7em',
                                cursor: 'pointer'
                            }} type="ThreeDots" color="#ffffff" height={30} width={30} />
                        }
                    </div></>}
            </div>
        )
    }
}
