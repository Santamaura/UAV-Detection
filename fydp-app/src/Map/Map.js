import React, { Component } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Pin from './Pin/Pin';
import Rippling from './DetectedGif/Rippling';
import styles from './styles.css';

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
            dronePopupInfo: false
        };
        this.renderUserPopup = this.renderUserPopup.bind(this);
        this.renderDronePopup = this.renderDronePopup.bind(this);
    }
    renderUserPopup() {
        const { systemLat, systemLon } = this.props.objects;
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
    
    //makes default 1 marker for detection array and then adds markers for all tracked drones
    render() {
        const { viewport } = this.state;
        const { items } = this.props;
        var drones = items.trackingInfo.map(function(item){
            return <DroneMarker marker={item}/>;
        });
        return (
            <div className="Map">
            <MapGL 
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={TOKEN}>
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
                    {this.state.userPopupInfo ? this.renderUserPopup() : null}
                    {drones}
                    {this.state.dronePopupInfo ? this.renderDronePopup() : null}
                    {/* <Marker
                        latitude={43.4695}
                        longitude={-80.5319}
                        offsetTop={-50}
                        offsetLeft={-100}>
                        <div
                            className={styles.pin}
                            onClick={() => this.setState({ userPopupInfo: true })} >
                            <Pin />
                        </div>
                    </Marker>
                    {this.state.userPopupInfo ? this.renderUserPopup() : null}
                    Object.keys(this.state.items).map(item => (
                        <DroneMarker marker={item}/>
                        {this.state.dronePopupInfo ? this.renderDronePopup() : null}
                    )) */}
                    {/* <DroneMarker marker={{lat: 43.4695, long: -80.5319, offTop: 0, offLeft: 0}} /> */}
                        {/* latitude={43.4695}
                        longitude={-80.5319}
                        offsetTop={0}
                        offsetLeft={0}>
                        <div
                            className={styles.pin}
                            onClick={() => this.setState({ dronePopupInfo: true })}>
                            <Rippling />
                        </div>
                    </Marker> */}
                    {/* {this.state.dronePopupInfo ? this.renderDronePopup() : null} */}
                </div>
            </MapGL>
            </div>
        );
    }
}