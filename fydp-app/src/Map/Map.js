import React, { Component } from 'react';
import MapGL, { Marker, Popup, MapState } from 'react-map-gl';
import Pin from './Pin/Pin';
import Rippling from './DetectedGif/Rippling';
import Circle from './Circle/Circle';
import styles from './styles.css';
import store from '../Redux/store';
import Rectangle from './Rectangle/Rectangle.js';
import Modal from '@material-ui/core/Modal';
// import MapState from 'react-map-gl';
import * as d3 from 'd3';



const TOKEN = 'pk.eyJ1IjoiYWpzYW50YW0iLCJhIjoiY2pyZHpmNWt4MXUwZzQ0bndnMGw5MzRjMyJ9.Wun_Glz6UWIONCcdi61btQ';
const DroneMarker = ({ marker }) => <Marker
    latitude={marker.estimatedLat}
    longitude={marker.estimatedLon}
    offsetTop={0}
    offsetLeft={0}>
    <div
        className={styles.pin}>
        {/* onClick={() => renderDronePopup()}> */}
        <Rippling />
    </div>
    <div className={styles.tracked}>
        {/* <Popup
            tipsize={5}
            anchor="top"
            latitude={marker.estimatedLat}
            longitude={marker.estimatedLon}
            offsetTop={48}
            offsetLeft={38}
        /> */}
    </div>
</Marker>;

const DetectionCircle = ({ marker, origin }) => <Marker
latitude={origin.systemLat+0.00003}
longitude={origin.systemLon-0.00003}
offsetTop={-210}
offsetLeft={-260}>
<div><Circle radius={marker.estimatedDistance}/></div>
</Marker>;


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: this.props.items.systemStats.systemLat, 
                longitude: this.props.items.systemStats.systemLon, 
                zoom: 19,
                bearing: 0,
                pitch: 0,
                width:"100%",
                height:"100%"
            },
            userPopupInfo: false,
            dronePopupInfo: false,
            withinGeoFence: false,
            detectedObjects: []
        };
        // this.renderUserPopup = this.renderUserPopup.bind(this);
        // this.renderDronePopup = this.renderDronePopup.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.bounds = this.bounds.bind(this);
    }
    // renderUserPopup() {
    //     const { systemLat, systemLon } = this.props.items.systemStats;
    //     return (
    //         <Popup
    //             tipSize={5}
    //             anchor="top"
    //             latitude={systemLat}
    //             longitude={systemLon}
    //             offsetTop={-22}
    //             offsetLeft={-88}
    //             onClose={() => this.setState({ userPopupInfo: null })}
    //             closeOnClick={true}>
    //             <p>{'Detection array is here'}</p>
    //         </Popup>
    //     )
    // }

    // renderDronePopup() {
    //     return (
    //         <Popup
    //             tipsize={5}
    //             anchor="top"
    //             latitude={43.4695}
    //             longitude={-80.5319}
    //             offsetTop={48}
    //             offsetLeft={38}
    //             onClose={() => this.setState({ dronePopupInfo: null })}
    //             closeOnClick={true}>
    //             <p>{'Drone 1'}</p>
    //         </Popup>
    //     )
    // }
    bounds(project) {
        const { trackingInfo } = this.props.items;
        this.setState({
            withinGeoFence: false
        })
        console.log(trackingInfo);
        console.log(project);
        trackingInfo.forEach(trackedItem => {
            console.log(trackedItem);
            console.log(project);
            if(trackedItem.estimatedLat < project[0][1] && 
                trackedItem.estimatedLon > project[0][0] && 
                trackedItem.estimatedLat > project[1][1] &&
                trackedItem.estimatedLon < project[1][0]) {
                    console.log('HITT');
                    this.setState({
                        withinGeoFence: true
                    })
            }
        })
      }

    handleStoreChange(storeArray) {
        const { detectionInfo } = this.props.items;
        let displayDetections = storeArray.showDetections.filter(function(stored) {
            return stored.isVisible == true;
        });
        if(displayDetections == undefined) {
            return null;
        }
        let returnDetections = [];
        detectionInfo.forEach(item => displayDetections.forEach(comparer => {
            return item.freq == comparer.freq ? returnDetections.push(item) : null
        }));
         this.setState({
            detectedObjects: [...returnDetections]
         });
    }
    
    //makes default 1 marker for detection array and then adds markers for all tracked drones
    render() {
        const { viewport, userPopupInfo, dronePopupInfo, detectedObjects, withinGeoFence } = this.state;
        const { items } = this.props;
        var drones = items.trackingInfo.map(function(item){
            return <DroneMarker marker={item}/>;
        });
        var detectedDrones = detectedObjects.map(function(item) {
            return <DetectionCircle marker={item} origin={items.systemStats} />;
        })

        store.subscribe(() => this.handleStoreChange(store.getState()))
        
        return (
            <div className="Map">
            <MapGL 
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={TOKEN}
                >
                <div className={styles.navStyle}>
                    <Marker
                        latitude={items.systemStats.systemLat}
                        longitude={items.systemStats.systemLon}
                        offsetTop={-58}
                        offsetLeft={-98}>
                        <div
                            className={styles.pin}
                             >
                            <Pin />
                        </div>
                    </Marker>
                    {drones}
                    {detectedDrones}
                </div>
                {withinGeoFence ? 
                    <Rectangle 
                        tracked={items.trackingInfo}>
                    </Rectangle> 
                    :
                    <Rectangle tracked={items.trackingInfo}></Rectangle>
                    }
            </MapGL>
            
            
            </div>
        );
    }
}