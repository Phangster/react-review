import React from "react";
import { Link } from 'react-router-dom';

const styles = {
  labels: {
    color: "red"
  }
};

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    let text = event.target.value;
    let field = event.target.name === "username" ? "username" : "password";
    this.setState({ [field]: text });
  }

  submitHandler(event) {
    event.preventDefault();
    const opts = {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({...this.state})
    }
    fetch('/login', opts)
      .then(r => r.json())
      .then(d => {
        this.props.loginHandler(d);
        this.setState({
          username: '',
          password: ''
        });
      })
    
  }

  render() {
    return (
      <div className="loginForm">
        <form onSubmit={this.submitHandler}>
          <label style={styles.labels} htmlFor="username">
            User Name:
          </label>
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <br />

          <label style={styles.labels} htmlFor="password">
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <br />

          <input type="submit" value="Login" />
        </form>
        <Link to='/greeting'>Say hello instead</Link>
      </div>
    );
  }
}
