import React, { Component } from 'react';
// import logo from './logo.svg';
import items from './sample.json';
import './App.css';
import Map from './Map/Map.js';
import Panel from './Panel/Panel.js';
import styles from './App.css';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;
const drawerStyles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
}
})
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            open: true
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
        <div className="Panel">
          <Drawer
          variant="permanent"
          classes={{
            paper: classNames(drawerStyles.drawerPaper),
          }}
          open={this.state.open}>
          <Panel items={items}/>
          </Drawer>
        </div>
        <Map className="Map" items={items}/>
        </div>
        
    );
  }
}

export default App;
