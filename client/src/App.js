import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Write from './components/Write'

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Write />} />
                    </Routes>
                </Router>
            
            </div >
        )
    }
}
