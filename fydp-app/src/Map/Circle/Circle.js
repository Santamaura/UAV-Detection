import React, { Component } from 'react';

export class Circle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { radius } = this.props;
        let scale = (radius * 10).toString();
        return(
            <svg height="100" width="100">
                <circle cx="50" cy="50" r={scale} stroke="black" stroke-width="2" fill="lightgrey" fill-opacity="0.2" />
            </svg> 
        )
    }
}

export default Circle;