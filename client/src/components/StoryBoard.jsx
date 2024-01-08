import React, { Component } from 'react'
import { TiDeleteOutline as DeleteIcon } from 'react-icons/ti'

export default class StoryBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredChp: -1
        };
    }
    render() {
        const { chapters, activeChapter, setActiveChapter, title, addChapter, deleteChapter } = this.props;
        return (
            <div style={{
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
                flexDirection: 'column',
                outline: 'white solid 1px'
            }}>
                <div style={{
                    fontSize: '1.4em',
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    borderBottom: 'white solid 1px',
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
                            width: '100%',
                            textAlign: 'center',
                            outline: 'none'
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
                }}
                    onClick={() => addChapter('', '')}
                >
                    <span style={{
                        border: 'none',
                        //semi transparent blue
                        background: 'rgba(251, 192, 147, 0.5)',
                        color: '#ffffff',
                        fontSize: '1em',
                        width: '100%',
                        textAlign: 'center',
                        outline: 'none',
                        padding: '2px',
                    }}>Add chapter</span>
                </div>
            </div>

        )
    }
}
