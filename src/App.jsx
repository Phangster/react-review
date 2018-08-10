import React from 'react';
import LoginForm from './Components/LoginForm';
import { Switch,Route,Link,Redirect } from 'react-router-dom';
import Greeting from './Components/Greeting';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            name: ''
        };
        this.loginHandler = this.loginHandler.bind(this);
    }
    
    loginHandler(loginStatus) {
        if (loginStatus.message === 'success') {
            this.setState({loggedIn: true, name: loginStatus.username})
        };
    }

    render() {
        return (
            <div className="container">
                {this.state.loggedIn && <Redirect to='/greeting' />}
                <div className="row">
                    <div className="col-12 text-center">
                        {this.props.name}
                    </div>
                </div>
                <Switch>
                    <Route exact path='/' render={()=><LoginForm loginHandler={this.loginHandler} />}/>
                    <Route path='/greeting' render={()=><Greeting name={this.state.name} />}/>
                </Switch>
            </div>
        );
    }
}