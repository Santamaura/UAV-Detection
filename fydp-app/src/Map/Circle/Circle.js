import React, { Component } from 'react';

export class Circle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { radius } = this.props;
        let scale = (radius * 10).toString();
        return(
            <svg height="300" width="300" viewBox="0 0 300 300">
                <circle cx="70" cy="70" r={scale} stroke="black" stroke-width="2" fill="lightgrey" fill-opacity="0.2" />
            </svg> 
        )
    }
}

export default Circle;