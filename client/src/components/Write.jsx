import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import TextEditor from './TextEditor'
import StoryBoard from './StoryBoard'
import GrammarBoard from './GrammarBoard'
import AIChat from './AIChat'
import ActivityBarHorizontal from './ActivityBarHorizontal'

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctedText: '',
            activeBoard: window.innerWidth<768?'':'story',
            correctedHtml: <></>,
            activeChapter: 0,
            title: '',
            chapters: [],
            type: 'Novel',
            uniqueId: '',
            content: '',
            description: '',
            genre: '',
            loading: true,
            user: '',
            redirect: false,
            alignment: 'center',
        };
    }
    createNovel = async () => {
        try {
            this.setState({ loading: true })
            const response = await fetch('https://spear-backend-ba92a9024732.herokuapp.com/content/create-novel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({

                }),
            })
            const data = await response.json()
            this.setState({ title: data.title, chapters: data.chapters, type: data.type, uniqueId: data.uniqueId, content: data.content, description: data.description, genre: data.genre })
            this.setState({ loading: false })
        } catch (error) {
            console.error('Error:', error);
        }
    }
    setAlign = (align) => {
        this.setState({ alignment: align })
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
        let updatedChapters = [];
        if(chapters){
            updatedChapters = [...chapters];
        }else{
            updatedChapters = []
        }
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
        if (this.state.chapters.length > this.state.activeChapter) {
            let text = this.state.chapters[this.state.activeChapter].content
            try {
                const response = await fetch('https://spear-backend-ba92a9024732.herokuapp.com/grammar/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: text,
                    }),
                });
                const data = await response.json();
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
        return rightText
    }
    renderExplorer() {
        const { activeBoard, uniqueId, chapters, activeChapter, title, genre, correctedText,user } = this.state;

        switch (activeBoard) {
            case 'story':
                return uniqueId !== '' ? (
                    <StoryBoard
                        chapters={chapters}
                        activeChapter={activeChapter}
                        title={title}
                        genre={genre}
                        setActiveChapter={(index) => this.setState({ activeChapter: index })}
                        addChapter={this.addChapter}
                        deleteChapter={this.deleteChapter}
                        changeMainTitle={this.changeHeadTitle}
                        user={user}
                        createNovel={this.createNovel}
                    />
                ) : null;

            case 'grammar':
                return <GrammarBoard correctedText={correctedText} getGrammarErrors={this.getGrammarErrors} setText={this.setText} text={chapters ? chapters[activeChapter]?.content : ''} />;

            case 'ai':
                return <AIChat 
                    title={this.state.chapters[this.state.activeChapter]?.title}
                    content={this.state.chapters[this.state.activeChapter]?.content}
                />;

            default:
                return null;
        }
    }
    setActiveBoard = (board) => {
        this.setState({ activeBoard: board })

    }
    async componentDidMount() {
        try {
            const token = localStorage.getItem('token')
            if (!token || token === 'undefined') {
                this.setState({ redirect: true })
                return;
            }
            else {
                const response = await fetch('https://spear-backend-ba92a9024732.herokuapp.com/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`
                    },
                })
                const data = await response.json()
                this.setState({ user: data.fullname, uniqueId: data.contents.length > 0 ? data.contents[0].uniqueId :''})
            }
            setTimeout(async () => {
                console.log(this.state.uniqueId)
                const params = { uniqueId: this.state.uniqueId }
                const Query = new URLSearchParams(Object.entries(params)).toString();
                const response = await fetch(`https://spear-backend-ba92a9024732.herokuapp.com/content/get-content/?${Query}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`
                    },
                })
                const data = await response.json()
                if (data.message === 'Content not found' || data.error === 'Content retrieval failed') {
                    this.setState({ loading: false })
                } else {
                    console.log(data)
                    this.setState({ title: data.title, chapters: data.chapters, type: data.type, uniqueId: data.uniqueId, content: data.content, description: data.description, genre: data.genre })
                    this.setState({ loading: false })
                }
                setInterval(async () => {
                    await fetch('https://spear-backend-ba92a9024732.herokuapp.com/content/update-novel/', {
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
            }, 100);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" />;
        } else {
            return (
                <div>
                    {!this.state.loading && this.state.uniqueId==='' && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(255, 181, 0, 0.5)",
                                zIndex: -9999,
                            }}
                        >
                            <button
                                onClick={() => {this.createNovel()}}
                                style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border: 'none'
                                }}
                            >
                                You have no novel opened right now, click here to make one
                            </button>
                        </div>
                    )}

                    <ActivityBarHorizontal
                        getGrammarErrors={this.getGrammarErrors}
                        setActiveBoard={this.setActiveBoard}
                        activeBoard={this.state.activeBoard}
                        setAlign={this.setAlign}
                        align={this.state.alignment}
                        loading={this.state.loading}
                    />
                    {this.renderExplorer()}
                    {!this.state.loading &&
                        (this.state.activeBoard === "" || window.innerWidth >= 768) &&
                        this.state.chapters?.length && (
                            <TextEditor
                                setText={this.setText}
                                setTitle={this.setTitle}
                                text={this.state.chapters[this.state.activeChapter]?.content}
                                correctedText={this.state.correctedText}
                                title={
                                    this.state.chapters
                                        ? this.state.chapters[this.state.activeChapter]?.title
                                        : ""
                                }
                                content={
                                    this.state.chapters
                                        ? this.state.chapters[this.state.activeChapter]?.content
                                        : ""
                                }
                                activeBoard={this.state.activeBoard}
                                alignment={this.state.alignment}
                            />
                        )}
                </div>
            );
        }
    }
}
