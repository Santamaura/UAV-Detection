import React, { Component } from 'react';
import moment from 'moment';
import styles from '../App.css';

export default class Panel extends Component {

    render() {
        const systemStats = this.props.items;
        return (
            <div className="Panel">
                <h2>{'Current Scanning Frequency: ' + systemStats.currentScanFreq}</h2>
                <h2>{'Current Time: ' + moment.unix(systemStats.currentTime).format("MM/DD/YYYY")}</h2>
                <h2>{'Current Tracking Frequency: ' + systemStats.currentTrackFreq}</h2>
                <h2>{'Flow Graph Version: ' + systemStats.flowgraphVersion}</h2>
                <h2>{'Software Version: ' + systemStats.softwareVersion}</h2>
                <h2>{'System Latitude: ' + systemStats.systemLat}</h2>
                <h2>{'System Longitude: ' + systemStats.systemLon}</h2>
                <h2>{'Uptime: ' + systemStats.uptime}</h2>
            </div>
        )
    }
}