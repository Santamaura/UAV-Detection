import React, { Component } from 'react';

export class Rippling extends Component {
    render() {
        return(
            <svg
  width="75px"
  height="75px"
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
  className="lds-ripple"
  style={{ background: "none" }}
>
  <circle
    cx={50}
    cy={50}
    r="28.3634"
    fill="none"
    ng-attr-stroke="{{config.c1}}"
    ng-attr-stroke-width="{{config.width}}"
    stroke="#df1317"
    strokeWidth={2}
  >
    <animate
      attributeName="r"
      calcMode="spline"
      values="0;40"
      keyTimes="0;1"
      dur={1}
      keySplines="0 0.2 0.8 1"
      begin="-0.5s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="opacity"
      calcMode="spline"
      values="1;0"
      keyTimes="0;1"
      dur={1}
      keySplines="0.2 0 0.8 1"
      begin="-0.5s"
      repeatCount="indefinite"
    />
  </circle>
  <circle
    cx={50}
    cy={50}
    r="6.08066"
    fill="none"
    ng-attr-stroke="{{config.c2}}"
    ng-attr-stroke-width="{{config.width}}"
    stroke="#e4934b"
    strokeWidth={2}
  >
    <animate
      attributeName="r"
      calcMode="spline"
      values="0;40"
      keyTimes="0;1"
      dur={1}
      keySplines="0 0.2 0.8 1"
      begin="0s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="opacity"
      calcMode="spline"
      values="1;0"
      keyTimes="0;1"
      dur={1}
      keySplines="0.2 0 0.8 1"
      begin="0s"
      repeatCount="indefinite"
    />
  </circle>
</svg>
        )
    }
}

export default Rippling;