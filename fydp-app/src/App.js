import React, { Component } from 'react';
// import logo from './logo.svg';
import items from './sample.json';
import './App.css';
import Map from './Map/Map.js';
import Panel from './Panel/Panel.js';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';

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
            open: true,
            radiusVal: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
componentDidMount() {
  this.timer = setInterval(() => this.getItems(), 500);
}

componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
}
handleChange(event) {
  this.setState({radiusVal: event.target.value});
}

handleSubmit(event) {
  alert('A radius was submitted: ' + this.state.radiusVal);
  event.preventDefault();
}
getItems() {
  this.setState({items: items});
    // fetch("http://192.168.3.4:5000/")
    //     .then(result => result.json())
    //     .then(result => this.setState({ items: result }))
    //     .catch((error) => {
    //       throw error;
    //     });
    console.log(this.state.items);
}

  render() {
    const {items} = this.state;

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
        <Map className="Map" items={items} detectionRadius={this.state.radiusVal}/>
        {/* <div className="detectionform">
          <form onSubmit={this.handleSubmit} style={{marginTop: '0'}} >
            <TextField
              id="standard-name"
              label="Detection Radius"
              value={this.state.radiusVal}
              onChange={this.handleChange}
              margin="none"
            />
          </form>
        </div> */}
      </div>
    );
  }
}

export default App;
