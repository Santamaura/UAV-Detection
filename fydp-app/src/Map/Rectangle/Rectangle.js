import React, {
    Component
} from 'react';
import {
    BaseControl
} from 'react-map-gl';
import * as d3 from 'd3';

var rect = null;
// var points = null;
const detectedStyle = {
    fill: 'red',
    opacity: 0.3
}
const undetectedStyle = {
    fill: 'green',
    opacity: 0.3
}

export class Rectangle extends BaseControl {
    constructor(props) {
        super(props);
        this.getPoints = this.getPoints.bind(this);
        this.dothings = this.dothings.bind(this);
        this.state = {
            convertToPoints: this.getPoints
        }
    }
    componentDidMount() {
        this.drawRect();
    }
    getPoints(long, lat) {
        return this._context.viewport.project([long, lat]);
    }
    changeColour(style) {
        if (rect) {
            rect.attr("fill", style.fill);
        }
    }
    dothings(tracked){
        var isTracked = false;
        if(rect){
            if (tracked) {
                tracked.forEach((trackedItem) => {
                    var points = this.getPoints(trackedItem.estimatedLon, trackedItem.estimatedLat);
                    var x1 = parseInt(rect.attr("x")); 
                    var y1 = parseInt(rect.attr("y")); 
                    var x2 = parseInt(rect.attr("width")) + parseInt(rect.attr("x")); 
                    var y2 = parseInt(rect.attr("y")) + parseInt(rect.attr("height"));
                    if(points[0]+35 > x1 && points[0]+35 < x2 && points[1]+35 > y1 && points[1]+35 < y2){
                        isTracked = true;
                        return;
                    }
                });
            }
            if(isTracked){
                rect.attr("fill", detectedStyle.fill);
            }
            else{
                rect.attr("fill", undetectedStyle.fill);
            }
        }
    }
    drawRect() {
        const {
            tracked
        } = this.props;
        const thing = this.dothings;
        const {
            convertToPoints
        } = this.state;
        // var rect = null;
        var svg = d3.select("#rectangle").select("svg")
            .attr("width", 10000)
            .attr("height", 10000)
            .on("mousedown", function () {
                var m = d3.mouse(this);
                if (rect) {
                    rect.remove();
                }
                rect = svg.append("rect")
                    .attr("x", m[0])
                    .attr("y", m[1])
                    .attr("height", 0)
                    .attr("width", 0)
                    .attr("opacity", 0.3);

                svg.on("mousemove", function () {
                    var m = d3.mouse(this);

                    rect.attr("width", Math.max(0, m[0] - +rect.attr("x")))
                        .attr("height", Math.max(0, m[1] - +rect.attr("y")));

                });
            })
            .on("mouseup", function () {
                svg.on("mousemove", null);
                thing(tracked);
            });

    }
    _render() {
        const {tracked} = this.props;
        if(tracked){
            this.dothings(tracked);
        }
        return <div id = {"rectangle"} >
            <svg > </svg> </div>;
    }
}

export default Rectangle;