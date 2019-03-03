import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map/Map.js';

class App extends Component {
  componentDidMount() {
    this.timer = setInterval(()=> this.getItems(), 500);
}

componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
}
getItems(){
    fetch("some url")
        .then(result => result.json())
        .then(result => this.setState({ items: result }));
}

  render() {
    return (
        <Map items={this.state.items['tracking-info']}/>
    );
  }
}

export default App;
