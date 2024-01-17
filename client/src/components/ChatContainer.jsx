import React, { Component } from 'react'

export default class ChatContainer extends Component {
    constructor(props) { 
        super(props);
        this.state = {

        };
    }
    render() {
        const formattedText = this.props.text.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`).replace(/\*(.*?)\*/g, (match, p1) => `<i>${p1}</i>`)        
        return (
            <div style={{
                backgroundColor: this.props.prompt?'yellow':'blue',
                width: window.innerWidth>=768?'15.8vw':'78vw',
                height: 'fit-content',
                outline: 'white solid 0.1vw',
                margin: '0.1vw',
                textAlign: 'center',
                color: this.props.prompt?'black':'white',
                fontWeight: 'auto',
            }}
            dangerouslySetInnerHTML={{__html: formattedText}}
            >
            </div>
        )
    }
}
