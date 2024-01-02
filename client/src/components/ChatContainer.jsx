import React, { Component } from 'react'

export default class ChatContainer extends Component {
    constructor(props) { 
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div style={{
                backgroundColor: this.props.prompt?'yellow':'blue',
                width: '15.8vw',
                height: 'fit-content',
                outline: 'white solid 0.1vw',
                margin: '0.1vw',
                textAlign: 'center',
                color: this.props.prompt?'black':'white',
            }}>
                {this.props.text}
            </div>
        )
    }
}
