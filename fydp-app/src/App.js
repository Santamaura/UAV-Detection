import React, { Component } from 'react';
// import logo from './logo.svg';
import items_1 from './video_data_1.json';
import items_2 from './video_data_2.json';
import items_3 from './video_data_3.json';
import items_4 from './video_data_4.json';
import items_5 from './video_data_5.json';
import items_6 from './video_data_6.json';
import items_7 from './video_data_7.json';
import items_8 from './video_data_8.json';
import items_9 from './video_data_9.json';
import items_10 from './video_data_10.json';
import items_11 from './video_data_11.json';

import './App.css';
import Map from './Map/Map.js';
import Panel from './Panel/Panel.js';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 240;
var index = 0;
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
  this.timer = setInterval(()=>{
    index = index % 11 + 1; 
    this.getItems(index);
  }, 3000); 
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
getItems(index) {
  index = index % 11 + 1;
  console.log(index);
  switch(index){
    case 1:
    this.setState({items: items_1});
    break;
    case 2:
    this.setState({items: items_2});
    break;
    case 3:
    this.setState({items: items_3});
    break;
    case 4:
    this.setState({items: items_4});
    break;
    case 5:
    this.setState({items: items_5});
    break;
    case 6:
    this.setState({items: items_6});
    break;
    case 7:
    this.setState({items: items_7});
    break;
    case 8:
    this.setState({items: items_8});
    break;
    case 9:
    this.setState({items: items_9});
    break;
    case 10:
    this.setState({items: items_10});
    break;
    case 11:
    this.setState({items: items_11});
    break;
  }
  
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
