import React, { Component } from 'react';
import MapGL, { Marker, Popup, SVGOverlay } from 'react-map-gl';
import Pin from './Pin/Pin';
import Rippling from './DetectedGif/Rippling';
import Circle from './Circle/Circle';
import styles from './styles.css';
import store from '../Redux/store';
import Rectangle from './Rectangle/Rectangle.js';
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
        <Popup
            tipsize={5}
            anchor="top"
            latitude={marker.estimatedLat}
            longitude={marker.estimatedLon}
            offsetTop={48}
            offsetLeft={38}
        />
    </div>
</Marker>;

const DetectionCircle = ({ marker, origin }) => <Marker
    latitude={origin.systemLat}
    longitude={origin.systemLon}
    offsetTop={-80}
    offsetLeft={-136}>
    <div><Circle radius={marker.estimatedDistance}/></div>
</Marker>;

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: this.props.items.systemStats.systemLat, 
                longitude: this.props.items.systemStats.systemLon, 
                zoom: 18.55,
                bearing: 0,
                pitch: 0,
                width:"100%",
                height:"100%"
            },
            userPopupInfo: false,
            dronePopupInfo: false,
            detectedObjects: []
        };
        this.renderUserPopup = this.renderUserPopup.bind(this);
        this.renderDronePopup = this.renderDronePopup.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.onClickMap = this.onClickMap.bind(this);
        this.drawRect = this.drawRect.bind(this);
    }
    renderUserPopup() {
        const { systemLat, systemLon } = this.props.items.systemStats;
        return (
            <Popup
                tipSize={5}
                anchor="top"
                latitude={systemLat}
                longitude={systemLon}
                offsetTop={-22}
                offsetLeft={-88}
                onClose={() => this.setState({ userPopupInfo: null })}
                closeOnClick={true}>
                <p>{'Detection array is here'}</p>
            </Popup>
        )
    }

    renderDronePopup() {
        return (
            <Popup
                tipsize={5}
                anchor="top"
                latitude={43.4695}
                longitude={-80.5319}
                offsetTop={48}
                offsetLeft={38}
                onClose={() => this.setState({ dronePopupInfo: null })}
                closeOnClick={true}>
                <p>{'Drone 1'}</p>
            </Popup>
        )
    }
    redraw({project}) {
        const [cx, cy] = project([-80.5319, 43.4695]);
        return <circle cx={cx} cy={cy} r={4} fill="blue" />;
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
    onClickMap(evt) {
        console.log("LSLDSAFASDA");
        console.log(evt.lngLat);
    }
    
    //makes default 1 marker for detection array and then adds markers for all tracked drones
    render() {
        const { viewport, userPopupInfo, dronePopupInfo, detectedObjects } = this.state;
        const { items } = this.props;
        var drones = items.trackingInfo.map(function(item){
            return <DroneMarker marker={item}/>;
        });
        let detectedDrones = detectedObjects.map(function(item) {
            return <DetectionCircle marker={item} origin={items.systemStats} />;
        })

        store.subscribe(() => this.handleStoreChange(store.getState()))
        
        console.log(this.state.detectedObjects.length);
        return (
            <div className="Map">
            <MapGL 
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={TOKEN}
                onClick={this.onClickMap}>
                <div className={styles.navStyle}>
                    <Marker
                        latitude={items.systemStats.systemLat}
                        longitude={items.systemStats.systemLon}
                        offsetTop={-50}
                        offsetLeft={-100}>
                        <div
                            className={styles.pin}
                            onClick={() => this.setState({ userPopupInfo: true })} >
                            <Pin />
                        </div>
                    </Marker>
                    {userPopupInfo ? this.renderUserPopup() : null}
                    {drones}
                    {detectedDrones}
                    {dronePopupInfo ? this.renderDronePopup() : null}
                </div>
                <SVGOverlay redraw={this.redraw}>
                    {/* <div id={"rectangle"}>
                    </div>; */}
                </SVGOverlay>
            </MapGL>
            
            {/* <Rectangle></Rectangle> */}
            </div>
        );
    }
}