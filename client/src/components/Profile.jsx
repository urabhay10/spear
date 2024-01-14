import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import RandomFontSpan from './TitleAnimated'
import { MdOutlineLogout as LogoutIcon } from "react-icons/md";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { MdOutlineDelete as DeleteIcon } from "react-icons/md";
import './css/Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            loading: true,
            randFonts: this.getRandomFonts(),
            redirect: false,
            contents: [],
            email: ''
        };
    }
    fonts = [
        'Kirang Haerang',
        'Indie Flower',
        'Rye',
        'Amatic SC',
        'Bangers',
        'Fredericka the Great'
    ];
    getRandomFonts() {
        return [
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],
            this.fonts[Math.floor(Math.random() * this.fonts.length)],

        ]
    }
    async retrieveContents(contents) {
        const response = await fetch('http://localhost:8000/content/get-all-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }, body: JSON.stringify({
                uniqueIds: contents
            })
        });
        const data = await response.json();
        console.log(data)
        if (!data) {
            this.setState({ redirect: true });
            return;
        } else {
            console.log(data)
            this.setState({ contents: data })
        }
    }
    async getContent(uniqueId) {
        try {
            const params = { uniqueId: uniqueId }
            const Query = new URLSearchParams(Object.entries(params)).toString();
            const response = await fetch(`http://localhost:8000/content/get-content/?${Query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            })
            const data = await response.json()
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async updateContent(content) {
        try {
            await fetch('http://localhost:8000/content/update-novel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: content.title,
                    chapters: content.chapters,
                    type: content.type,
                    uniqueId: content.uniqueId,
                    content: content.content,
                    description: content.description,
                    genre: content.genre
                }),
            })
        } catch (error) {
            console.log(error);
        }
    }
    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({ redirect: true });
    }
    async deleteContent(uniqueId) {
        try {
            const response = await fetch('http://localhost:8000/content/delete-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    uniqueId: uniqueId
                }),
            })
            const data = await response.json()
            console.log(data)
            if (!data) {
                this.setState({ redirect: true });
                return;
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    async componentDidMount() {
        this.changeFontInterval = setInterval(() => {
            this.setState({
                randFonts: this.getRandomFonts(),
            });
        }, 350);
        if (!localStorage.getItem('token')) {
            this.setState({ redirect: true });
            return;
        } else {
            const response = await fetch('http://localhost:8000/user/profile', {
                method: 'GET',//change to get for it to work
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data)
            if (!data) {
                this.setState({ redirect: true });
                return;
            } else {
                this.setState({ name: data.fullname, contents: data.contents ? data.contents : [], email: data.email })
                await this.retrieveContents(data.contents);
                this.setState({ loading: false });
            }
            setInterval(() => {
                console.log(this.state)
            }, 5000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.changeFontInterval);
    }

    render() {
        const brandStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#000000',
            fontSize: '3em',
            position: 'fixed',
            width: '100vw',
            zIndex: '-1'
        };

        if (this.state.redirect) {
            return <Navigate to="/login" />;
        } else if (this.state.loading) {
            return (
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        backgroundColor: '#000000',
                        overflowY: 'hidden',
                        position: 'fixed'
                    }} className='body'>
                        <div className="profile-ring">
                            <i style={{ "--clr": "#00ff0a" }}></i>
                            <i style={{ "--clr": "#ec8942" }}></i>
                            <i style={{ "--clr": "#b4ff72" }}></i>
                            <i style={{ "--clr": "#85C1E9" }}></i>
                        </div>
                        <div style={brandStyle} className="brand">
                            {this.state.randFonts.map((font, index) => {
                                return <RandomFontSpan key={index} fontFamily={font} text={"SPEAR"[index]} isPosFixed={false} />
                            })}
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <div style={{
                    backgroundColor: '#222222',
                    width: '100vw',
                    height: '100vh',
                    color: '#ffffff'
                }}>
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #aaaaaa',
                    }}>
                        <div style={{
                            height: 'fit-content',
                            fontSize: '2.2em',
                            fontFamily: 'Lora',
                        }}>{this.state.name}</div>
                        <div style={{
                            height: 'fit-content',
                            fontSize: '1.5em',
                            fontFamily: 'Lora',
                            color: '#aaaaaa'
                        }}>{this.state.email}</div>
                    </div>

                    <div style={{ padding: '20px' }}>
                        {this.state.contents.length && this.state.contents?.map((content, index) => {
                            return (
                                <div key={index} style={{
                                    backgroundColor: content.type === 'Novel' ? '#ffa500' : '#333333',
                                    padding: '20px',
                                    marginBottom: '20px',
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    color: '#eeeeee',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'

                                }}>
                                        <div style={{
                                            height: 'fit-content',
                                            fontSize: '1.5em',
                                            fontFamily: 'Lora',
                                        }}>{content.title}</div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                            alignItems: 'center',
                                        }}>
                                        <div style={{
                                            height: 'fit-content',
                                            fontSize: '1.2em',
                                            color: '#111111',
                                            backgroundColor: '#0000cc',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            margin: '0 10px'
                                        }} onClick={async () => {
                                            const x = await this.getContent(content.uniqueId);
                                            await this.updateContent(x);
                                            this.setState({ redirect: true });
                                        }}>
                                            <EditIcon style={{
                                                position: 'relative',
                                                top: '2px'
                                            }} />
                                            Edit</div>
                                        <div style={{
                                            height: 'fit-content',
                                            fontSize: '1.2em',
                                            color: '#111111',
                                            backgroundColor: '#cc0033',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }} onClick={async () => {
                                            const x = await this.deleteContent(content.uniqueId);
                                        }}>
                                            <DeleteIcon style={{
                                                position: 'relative',
                                                top: '2px'
                                            }} />
                                            Delete</div></div>
                                </div>
                            );
                        })}
                        <div onClick={this.handleLogout} style={{
                            cursor: 'pointer',
                            width: 'fit-content'
                        }}><LogoutIcon style={{
                            position: 'relative',
                            top: '3px'
                        }} />Logout</div>
                    </div>
                </div>
            );
        }
    }
}
