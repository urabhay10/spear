import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Write from './components/Write'
import Login from './components/Login'
import Signup from './components/Signup'

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Write />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/signup' element={<Signup />} />
                    </Routes>
                </Router>
            
            </div >
        )
    }
}
