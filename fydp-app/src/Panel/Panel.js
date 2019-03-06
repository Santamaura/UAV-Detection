import React, { Component } from 'react';
import moment from 'moment';
import styles from '../App.css';
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
import { Divider } from '@material-ui/core';

export default class Panel extends Component {
    

    render() {
        const systemStats = this.props.items.systemStats;
        const detectionInfo = this.props.items.detectionInfo;
        const trackingInfo = this.props.items.trackingInfo;
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
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary={`Current Time: ${moment.unix(systemStats.currentTime).format("MM/DD/YYYY")}`} />
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
          {/* {detectionInfo} */}
          <Divider />
          <ListSubheader component="div">Tracking Info</ListSubheader>
          {/* {trackingInfo} */}
          </List>
        )
    }
}