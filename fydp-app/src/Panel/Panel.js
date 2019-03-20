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

const DetectionItem = ({detectionItem, i}) => 
<div className="shiftedright">
    <ListSubheader>{detectionItem.deviceType}</ListSubheader>
    <ListItem>
      <ListItemIcon>
        <PortableWifiOffIcon />
      </ListItemIcon>
      <ListItemText
        primary={`Est. Distance: ${detectionItem.estimatedDistance.toFixed(3)} M`}
        class="detections"
        onClick={() => store.dispatch(toggleDetected(detectionItem.freq))}
      />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <PortableWifiOffIcon />
      </ListItemIcon>
      <ListItemText
        primary={`Freq: ${detectionItem.freq} GHz`}
        class="detections"
      />
    </ListItem>
  </div>;
const TrackingItem = ({trackingItem, i}) =>
<div className="shiftedright">
<ListSubheader>Drone {i+1}</ListSubheader>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Est. Distance: ${trackingItem.estimatedDistance} M`}/>
</ListItem>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Est. Angle: ${trackingItem.estimatedAngle} °`}/>
</ListItem>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Est. Latitude: ${trackingItem.estimatedLat}`}/>
</ListItem>
<ListItem>
    <ListItemIcon>
        <WifiTetheringIcon/>
    </ListItemIcon>
    <ListItemText primary={`Est. Longitude: ${trackingItem.estimatedLon}`}/>
</ListItem>
</div>;
class Panel extends Component {
    constructor(props){
        super(props);
        this.state = {
          open: true,
          showDetection: []
      };
    }

    componentDidMount() {
      const { detectionInfo } = this.props.items;
      detectionInfo.map(item => {
        store.dispatch(addDetected({freq: item.freq, isVisible: false}))
      })
    }

    componentDidUpdate() {
      const { items, showDetections } = this.props;
      let compareDetections = function(otherArray) {
          return function (current) {
            return otherArray.filter(function (other) {
              return other.freq == current.freq
            }).length == 0;
          }
        }

      if(items.detectionInfo.length > showDetections.length) {
        let newDetection = items.detectionInfo.filter(compareDetections(showDetections));
        store.dispatch(addDetected({freq: newDetection.freq, isVisible: false}))
      }
      else if(items.detectionInfo.length < showDetections.length) {
        let oldDetection = showDetections.filter(compareDetections(items.detectionInfo));
        store.dispatch(removeDetected({freq: oldDetection.freq}))
      }
    }
    
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    
    render() {
        const {systemStats, detectionInfo, trackingInfo} = this.props.items;
        var detections = detectionInfo.map(function(item, i){
            return <DetectionItem detectionItem={item} i={i}/>;
        });
        var trackings = trackingInfo.map(function(item, i){
            return <TrackingItem trackingItem={item} i={i}/>;
        });
        // items in detection and tracking need to be looped
        return (
        <List component="nav">
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
          <ListSubheader>System Status</ListSubheader>
        <Divider/>
          <ListItem>
            <ListItemIcon>
              <ScannerIcon />
            </ListItemIcon>
            <ListItemText primary= {`Scanning Freq.: ${systemStats.currentScanFreq} GHz`}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrackingChangesIcon />
            </ListItemIcon>
            <ListItemText primary={`Tracking Freq.: ${systemStats.currentTrackFreq} GHz`} />
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
            <ListItemText primary={`Latitude: ${systemStats.systemLat}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText primary={`Longitude: ${systemStats.systemLon}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TimelapseIcon />
            </ListItemIcon>
            <ListItemText primary={`Uptime: ${systemStats.uptime}`}/>
          </ListItem>
          <Divider />
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