import React, { Component } from 'react'
import TextEditor from './TextEditor'
import Navbar from './Navbar'
import StoryBoard from './StoryBoard'
import ActivityBar from './ActivityBar'
import GrammarBoard from './GrammarBoard'

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            correctedText: '',
            activeBoard: 'story',
            correctedHtml: <></>
        };
    }
    setText = (text) => {
        this.setState({ text: text });
    }
    getGrammarErrors = async () => {
        console.log('checking grammar');
        let { text } = this.state;
    
        try {
            const response = await fetch('http://localhost:8000/grammar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                }),
            });
    
            const data = await response.json();
            console.log(text);
            console.log(data);
            const rightText = await this.filterText(text, data)
            this.setState({ correctedText: rightText});
        } catch (error) {
            console.error('Error:', error);
        }
    };
    filterText = (text, data) => {
        let rightText = text
        for (let i = 0; i < data.Result.Tags.length; i++) {
            const startPos= data.Result.Tags[data.Result.Tags.length-i-1].startPos;
            const endPos= data.Result.Tags[data.Result.Tags.length-i-1].endPos;
            const suggestion = data.Result.Tags[data.Result.Tags.length-i-1].suggestions[0]
            const Text1 = rightText.substring(0, startPos)
            const Text2 = rightText.substring(endPos+1)
            rightText = Text1 + suggestion + Text2
        }
        console.log("righttext:"+rightText);
        return rightText
    }
    setActiveBoard = (board) => {
        this.setState({activeBoard:board})
    }

    render() {
        return (
            <div>
                <Navbar />
                <ActivityBar getGrammarErrors={this.getGrammarErrors} setActiveBoard={this.setActiveBoard}/>
                {this.state.activeBoard === 'story' ? <StoryBoard /> : this.state.activeBoard==='grammar'?<GrammarBoard correctedText={this.state.correctedText} getGrammarErrors={this.getGrammarErrors} setText={this.setText} text={this.state.text}/>:<></>}
                <TextEditor setText={this.setText} text={this.state.text} correctedText={this.state.correctedText}/>
            </div>
        )
    }
}
