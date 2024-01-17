import React, { Component } from 'react'
import { TiDeleteOutline as DeleteIcon } from 'react-icons/ti'
import { FaSquarePlus as Plus } from "react-icons/fa6";
import { Navigate } from 'react-router-dom';

export default class StoryBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredChp: -1
        };
    }
    render() {
        const { chapters, activeChapter, setActiveChapter, title, addChapter, deleteChapter } = this.props;
        if(this.state.redirect) return (<Navigate to="/profile" />)
        return (
            <div style={{
                alignItems: 'center',
                display: 'flex',
                width: window.innerWidth<768?'100vw':"20vw",
                height: '100vh',
                backgroundColor: '#000000',
                color: 'rgb(255, 255, 255)',
                position: 'fixed',
                flexWrap: 'nowrap',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                top: '40px',
                paddingTop: '10px',
                left: '0',
                flexDirection: 'column',
                outline: 'white solid 1px',
                borderTop: 'orange solid 4px',
            }}>
                <div style={{
                    fontSize: '1.4em',
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    borderBottom: 'orange solid 1px',
                    marginBottom: '5px',
                    position: 'relative',
                    left: '0px',
                    fontWeight: '600'
                }}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => this.props.changeMainTitle(e.target.value)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            color: '#ffffff',
                            fontSize: '1.4em',
                            width: '90%',
                            textAlign: 'center',
                            outline: 'none'
                        }}
                        onFocus={(e) => {
                            e.target.select()
                        }}
                    />
                </div>

                {chapters?.map((chapter, index) => {
                    return (
                        <div
                            style={{
                                fontSize: '1em',
                                width: '100%',
                                textAlign: 'left',
                                paddingLeft: '5px',
                                cursor: 'pointer',
                                color: activeChapter === index ? '#ffffff' : '#777777',
                                height: 'fit-content'
                            }}
                            onClick={() => setActiveChapter(index)}
                            key={index}
                            onMouseEnter={() => this.setState({ hoveredChp: index })}
                            onMouseLeave={() => this.setState({ hoveredChp: -1 })}
                        
                        >
                            <span style={{
                                width: '80%'
                            }}>
                                {chapter.title}
                            </span>
                            <span onClick={() => deleteChapter(index)}
                                style={{
                                    position: 'relative',
                                    fontSize: '0.8em',
                                    color: '#ff0000',
                                    lineHeight: '100%',
                                    cursor: 'pointer',
                                    width: '20%',
                                    visibility: this.state.hoveredChp === index ? 'visible' : 'hidden'
                                }}>
                                <DeleteIcon />
                            </span>
                        </div>
                    )
                })}
                <div style={{
                    fontSize: '1em',
                    width: '100%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: '#777700',
                    padding: '5px',
                    marginTop: '10px',
                }}
                    onClick={() => addChapter('', '')}
                >
                    <span style={{
                        border: 'none',
                        background: 'rgba(255, 165, 0, 0.8)',
                        color: '#ffffff',
                        fontSize: '1em',
                        width: '100%',
                        textAlign: 'center',
                        outline: 'none',
                        padding: '2px',
                        borderRadius: '3px',
                    }}>Add chapter</span>
                </div>
                    <div style={{
                        bottom: '40px',
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        height: '80px',
                    }}>
                        <span style={{
                            cursor: 'pointer',
                            padding: '5px',
                            marginTop: '10px',
                        }}
                            onClick={() => this.props.createNovel()}
                        >
                            <Plus size={40} color='orange'/>
                        </span>
                        <span style={{
                            fontSize: '1.5em',
                            width: '100%',
                            cursor: 'pointer',
                            color: '#ffffff',
                            padding: '5px',
                            marginTop: '10px',
                            textAlign: 'left',
                        }}
                            onClick={() => { this.setState({ redirect: true }) }}
                        >
                            {this.props.user}
                        </span>
                    </div>
            </div>

        )
    }
}
