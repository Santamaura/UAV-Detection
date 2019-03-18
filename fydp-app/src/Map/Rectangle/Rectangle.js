import React, { Component } from 'react';
import {BaseControl} from 'react-map-gl';
import * as d3 from 'd3';

export class Rectangle extends BaseControl {
    constructor(props) {
        super(props);
        this.getLatLng = this.getLatLng.bind(this);
        this.state = {
            convertToLatLng: this.getLatLng
        }
    }
    componentDidMount() {
        this.drawRect();
    }
    getLatLng(x0,y0, x1, y1){
        return [this._context.viewport.unproject([x0, y0]),this._context.viewport.unproject([x1, y1])];
    }
    drawRect() {
        const {callback} = this.props;
        const {convertToLatLng} = this.state;
        var rect = null;
        var svg = d3.select("#rectangle").append("svg")
            .attr("width", 10000)
            .attr("height", 10000)
            .on("mousedown", function(){
                var m = d3.mouse(this);
                if(rect){
                    rect.remove();
                }
                rect = svg.append("rect")
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
                var points = convertToLatLng(parseInt(rect.attr("x")), parseInt(rect.attr("y")), parseInt(rect.attr("x")) + parseInt(rect.attr("width")), parseInt(rect.attr("y")) + parseInt(rect.attr("height")));
                callback(points);
            });
        
    }
    _render() {
        return <div id={"rectangle"}>
         </div>;
    }
}

export default Rectangle;