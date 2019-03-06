import React, { Component } from 'react';
// import logo from './logo.svg';
import items from './sample.json';
import './App.css';
import Map from './Map/Map.js';
import Panel from './Panel/Panel.js';
import styles from './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
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
  this.setState({items: items});
    // fetch("http://192.168.3.4:5000/")
    //     .then(result => result.json())
    //     .then(result => this.setState({ items: result }))
    //     .catch((error) => {
    //       throw error;
    //     });
    // this.setState({isLoading: true});
    console.log(this.state.items);
}

  render() {
    const {items} = this.state;
    console.log(items);

    if(Object.entries(items).length === 0 && items.constructor === Object) {
      return <p>Loading...</p>;
    }
    return (
        <div>
        <Panel className="Panel" items={items.systemStats}/>
        <Map className="Map" items={items}/>
        </div>
    );
  }
}

export default App;
