import React, { Component } from 'react';
// import logo from './logo.svg';
// import items from './sample.json';
import './App.css';
import Map from './Map/Map.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            isLoading: true
        }
    }
componentDidMount() {
  this.timer = setInterval(() => this.getItems(), 500);
}

componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
}

getItems() {
    fetch("http://192.168.3.4:5000/")
        .then(result => result.json())
        .then(result => this.setState({ items: result, isLoading: false }))
        .catch((error) => {
          throw error;
        });
    this.setState({isLoading: true});
    console.log(this.state.items);
    // console.log("WHWHWHWHHW");
}

  render() {
    const {items, isLoading} = this.state;
    console.log(items);

    if(Object.entries(items).length === 0 && items.constructor === Object) {
      return <p>Loading...</p>;
    }
    return (
        <Map items={items}/>
    );
  }
}

export default App;
