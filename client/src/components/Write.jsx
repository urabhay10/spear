import React, { Component } from 'react'
import TextEditor from './TextEditor'
import Navbar from './Navbar'
import StoryBoard from './StoryBoard'
import ActivityBar from './ActivityBar'
import GrammarBoard from './GrammarBoard'
import AIChat from './AIChat'

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctedText: '',
            activeBoard: 'story',
            correctedHtml: <></>,
            activeChapter: 0,
            title: '',
            chapters: [],
            type: 'Novel',
            uniqueId: '',
            content: '',
            description: '',
            genre: '',
            loading: true
        };
    }
    setText = (text) => {
        const { activeChapter, chapters } = this.state;
        const updatedChapters = [...chapters];
        updatedChapters[activeChapter].content = text;
        this.setState({ chapters: updatedChapters });
    }
    setTitle = (text) => {
        const { activeChapter, chapters } = this.state;
        const updatedChapters = [...chapters];
        updatedChapters[activeChapter].title = text;
        this.setState({ chapters: updatedChapters });
    }
    addChapter = (title, content) => {
        const { chapters } = this.state;
        const updatedChapters = [...chapters];
        updatedChapters.push({ title, content });
        this.setState({ chapters: updatedChapters, activeChapter: updatedChapters.length - 1 });
    }
    deleteChapter = (index) => {
        const { chapters } = this.state;
        const updatedChapters = [...chapters];
        updatedChapters.splice(index, 1);
        this.setState({ chapters: updatedChapters, activeChapter: updatedChapters.length - 1 });
    }
    changeHeadTitle = (title) => {
        this.setState({ title: title })
    }
    getGrammarErrors = async () => {
        console.log('checking grammar');
        if (this.state.chapters.length > this.state.activeChapter) {
            let text = this.state.chapters[this.state.activeChapter].content
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
                this.setState({ correctedText: rightText });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    filterText = (text, data) => {
        let rightText = text
        for (let i = 0; i < data.Result.Tags.length; i++) {
            const startPos = data.Result.Tags[data.Result.Tags.length - i - 1].startPos;
            const endPos = data.Result.Tags[data.Result.Tags.length - i - 1].endPos;
            const suggestion = data.Result.Tags[data.Result.Tags.length - i - 1].suggestions[0]
            const Text1 = rightText.substring(0, startPos)
            const Text2 = rightText.substring(endPos + 1)
            rightText = Text1 + suggestion + Text2
        }
        console.log("righttext:" + rightText);
        return rightText
    }
    setActiveBoard = (board) => {
        this.setState({ activeBoard: board })
        
    }
    async componentDidMount() {
        try {
            const params = { uniqueId: 'k9v3vmtk3k7zg' }
            const Query = new URLSearchParams(Object.entries(params)).toString();
            const response = await fetch(`http://localhost:8000/content/get-content/?${Query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            })
            const data = await response.json()
            console.log(data)
            this.setState({ title: data.title, chapters: data.chapters, type: data.type, uniqueId: data.uniqueId, content: data.content, description: data.description, genre: data.genre })
            this.setState({ loading: false })
        } catch (error) {
            console.error('Error:', error);
        }
        setInterval(async () => {
            await fetch('http://localhost:8000/content/update-novel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: this.state.title,
                    chapters: this.state.chapters,
                    type: this.state.type,
                    uniqueId: this.state.uniqueId,
                    content: this.state.content,
                    description: this.state.description,
                    genre: this.state.genre
                }),
            })
        }, 5000);
    }
    render() {
        return (
            <div>
                <Navbar
                    loading={this.state.loading}
                />
                <ActivityBar
                    getGrammarErrors={this.getGrammarErrors}
                    setActiveBoard={this.setActiveBoard}
                    activeBoard={this.state.activeBoard}
                />
                {this.state.activeBoard === 'story' ?
                    <StoryBoard
                        chapters={this.state.chapters}
                        activeChapter={this.state.activeChapter}
                        title={this.state.title}
                        genre={this.state.genre}
                        setActiveChapter={(index) => this.setState({ activeChapter: index })}
                        addChapter={this.addChapter}
                        deleteChapter={this.deleteChapter}
                        changeMainTitle={this.changeHeadTitle}
                    /> :
                    this.state.activeBoard === 'grammar' ?
                        <GrammarBoard
                            correctedText={this.state.correctedText}
                            getGrammarErrors={this.getGrammarErrors}
                            setText={this.setText}
                            text={this.state.chapters ? this.state.chapters[this.state.activeChapter]?.content : ''}
                        /> :
                        this.state.activeBoard === 'ai' ?
                            <AIChat /> : <></>}
                {!this.state.loading && <TextEditor
                    setText={this.setText}
                    setTitle={this.setTitle}
                    text={this.state.chapters[this.state.activeChapter]?.content}
                    correctedText={this.state.correctedText}
                    title={this.state.chapters ? this.state.chapters[this.state.activeChapter]?.title : ''}
                    content={this.state.chapters ? this.state.chapters[this.state.activeChapter]?.content : ''}
                    activeBoard={this.state.activeBoard}
                />}
            </div>
        )
    }
}
