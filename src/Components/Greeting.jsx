import React from 'react';

export default class Greeting extends React.Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div className="">
                Hello, {this.props.name}!
            </div>
        )
    }
}