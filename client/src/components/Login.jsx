import React, { Component } from 'react'
import { Link, Navigate} from 'react-router-dom'
import './css/Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spanElements: [],
      email: '',
      password: '',
      redirect: false
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleLogin();
      }
    })
  }
  async handleLogin() {
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.setState({ redirect: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else {
      return (
        <div className='body'>
          <div className="ring">
            <i style={{ "--clr": "#00ff0a" }}></i>
            <i style={{ "--clr": "#ec8942" }}></i>
            <i style={{ "--clr": "#b4ff72" }}></i>
            <div className="login">
              <h2>Login</h2>
              <div className="inputBx">
                <input type="text" placeholder="Email" required value={this.state.email} onInput={(e) => { this.setState({ email: e.target.value }) }} />
              </div>
              <div className="inputBx">
                <input type="password" placeholder="Password" required value={this.state.password} onInput={(e) => { this.setState({ password: e.target.value }) }} />
              </div>
              <div className="inputBx">
                <button type="submit">Login</button>
              </div>
              <div className="links">
                <Link to='/signup'>Signup</Link>
              </div>
            </div>
          </div></div>
      )
    }
  }
}
