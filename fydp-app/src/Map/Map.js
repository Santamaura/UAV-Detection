import React, { Component } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Pin from './Pin/Pin';
import Rippling from './DetectedGif/Rippling';
import styles from './styles.css';

const TOKEN = 'pk.eyJ1IjoiYWpzYW50YW0iLCJhIjoiY2pyZHpmNWt4MXUwZzQ0bndnMGw5MzRjMyJ9.Wun_Glz6UWIONCcdi61btQ';
const DroneMarker = ({marker}) => <Marker
latitude={marker.lat}
longitude={marker.long}
offsetTop={marker.offTop}
offsetLeft={marker.offLeft}>
<div
    className={styles.pin}
    onClick={() => this.setState({ dronePopupInfo: true })}>
    <Rippling />
</div>
</Marker>;
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 43.4695, //e7 43.472935,
                longitude: -80.5319, //e7 -80.5396,
                zoom: 18.55,
                bearing: 0,
                pitch: 0,
                width: 800,
                height: 800,
            },
            userPopupInfo: false,
            dronePopupInfo: false
        };
        this.renderUserPopup = this.renderUserPopup.bind(this);
        this.renderDronePopup = this.renderDronePopup.bind(this);
    }
    renderUserPopup() {
        return (
            <Popup
                tipSize={5}
                anchor="top"
                latitude={43.4695}
                longitude={-80.5319}
                offsetTop={-22}
                offsetLeft={-88}
                onClose={() => this.setState({ userPopupInfo: null })}
                closeOnClick={true}>
                <p>{'You are here'}</p>
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
    
    render() {
        const { viewport } = this.state;

        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={TOKEN}>
                <div className={styles.navStyle}>
                    <Marker
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
                    ))
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
        );
    }
}