import React, { Component } from 'react';
// import logo from './logo.svg';
import items from './sample.json';
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
  this.timer = setInterval(()=> this.getItems(), 500);
}

componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
}

getItems(){
  this.setState({items: items, isLoading: false});
    // fetch("/getfile")
    //     .then(result => result.json())
    //     .then(result => this.setState({ items: result, isLoading: false }));
    // this.setState({isLoading: true});
    // console.log(this.state.items);
    // console.log("WHWHWHWHHW");
}

  render() {
    const {items, isLoading} = this.state;
    console.log(this.state.items);
    if(isLoading){
      return <p>Loading ...</p>;
    }
    return (
        <Map objects={items}/>
    );
  }
}

export default App;
