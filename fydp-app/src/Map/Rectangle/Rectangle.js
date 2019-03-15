import React, { Component } from 'react';
import * as d3 from 'd3';

export class Rectangle extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.drawRect();
    }
    drawRect() {
        var svg = d3.select("#rectangle").append("svg")
            .attr("width", 10000)
            .attr("height", 10000)
            .on("mousedown", function(){
                var m = d3.mouse(this);
                svg.select("rect").remove();
                var rect = svg.append("rect")
                    .attr("x", m[0])
                    .attr("y", m[1])
                    .attr("height", 0)
                    .attr("width", 0);
    
                svg.on("mousemove", function(){
                    var m = d3.mouse(this);

                    rect.attr("width", Math.max(0, m[0] - +rect.attr("x")))
                        .attr("height", Math.max(0, m[1] - +rect.attr("y")));
                });
            })
            .on("mouseup", function() {
                svg.on("mousemove", null);
            });
    }
    render() {
        return <div id={"rectangle"}>
                </div>;
    }
}

export default Rectangle;