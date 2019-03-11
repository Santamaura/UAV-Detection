import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TrackingChangesIcon from '@material-ui/icons/TrackChanges';
import FilterIcon from '@material-ui/icons/Filter1';
import ScannerIcon from '@material-ui/icons/Scanner';
import TimelineIcon from '@material-ui/icons/Timeline';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import LocationIcon from '@material-ui/icons/MyLocation';
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff'
import WifiTetheringIcon from '@material-ui/icons/WifiTethering'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { Divider } from '@material-ui/core';
import { toggleDetected, addDetected, removeDetected } from '../Redux/actions';
import store from '../Redux/store';
import { connect } from 'react-redux';

const DetectionItem = ({detectionItem}) => 
        <ListItem>
            <ListItemIcon>
                <PortableWifiOffIcon/>
            </ListItemIcon>
            <ListItemText 
                primary={`Estimated Distance: ${detectionItem.estimatedDistance.toFixed(3)} M`}
                onClick={() => store.dispatch(toggleDetected(detectionItem.freq))}
            />
        </ListItem>;
const TrackingItem = ({trackingItem, i}) =>
<div className="shiftedright">
<ListSubheader>Drone {i+1}</ListSubheader>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Estimated Distance: ${trackingItem.estimatedDistance}`}/>
</ListItem>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Estimated Angle: ${trackingItem.estimatedAngle}`}/>
</ListItem>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Estimated Latitude: ${trackingItem.estimatedLat}`}/>
</ListItem>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Estimated Longitude: ${trackingItem.estimatedLon}`}/>
</ListItem>
</div>;
class Panel extends Component {
    constructor(props){
        super(props);
    }
    state = {
        open: true,
        showDetection: []
    };

    componentDidMount() {
      const { detectionInfo } = this.props.items;
      detectionInfo.map(item => {
        store.dispatch(addDetected({freq: item.freq, isVisible: false}))
      })
    }
    
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };
    
    render() {
        const {systemStats, detectionInfo, trackingInfo} = this.props.items;
        var detections = detectionInfo.map(function(item){
            return <DetectionItem detectionItem={item}/>;
        });
        var trackings = trackingInfo.map(function(item, i){
            return <TrackingItem trackingItem={item} i={i}/>;
        });
        // items in detection and tracking need to be looped
        return (
        <List component="nav">
        <ListSubheader>System Status</ListSubheader>
        <Divider/>
          <ListItem>
            <ListItemIcon>
              <ScannerIcon />
            </ListItemIcon>
            <ListItemText primary= {`Current Scanning Frequency: ${systemStats.currentScanFreq}`}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrackingChangesIcon />
            </ListItemIcon>
            <ListItemText primary={`Current Tracking Frequency: ${systemStats.currentTrackFreq}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary={`Flow Graph Version: ${systemStats.flowgraphVersion}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FilterIcon />
            </ListItemIcon>
            <ListItemText primary={`Software Version: ${systemStats.softwareVersion}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText primary={`System Latitude: ${systemStats.systemLat}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText primary={`System Longitude: ${systemStats.systemLon}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TimelapseIcon />
            </ListItemIcon>
            <ListItemText primary={`Uptime: ${systemStats.uptime}`}/>
          </ListItem>
          <Divider />
          <ListSubheader component="div">Detection Info</ListSubheader>
          {detections}
          <Divider />
          <ListSubheader button onClick={this.handleClick}>
          Tracking Info
          {this.state.open ? <ExpandLess className="subheaderdropdown"/> : <ExpandMore className="subheaderdropdown"/>}
          </ListSubheader>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          {trackings}
          </List>
          </Collapse>
          </List>
        )
    }
}

function mapStateToProps(state) {
  return {
    showDetections: state.showDetections
  }
}

export default connect(mapStateToProps)(Panel);