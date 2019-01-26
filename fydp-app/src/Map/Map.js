import React, {Component} from 'react';
import MapGL, {NavigationControl} from 'react-map-gl'
import styles from './styles.css';

const TOKEN = 'pk.eyJ1IjoiYWpzYW50YW0iLCJhIjoiY2pyZHpmNWt4MXUwZzQ0bndnMGw5MzRjMyJ9.Wun_Glz6UWIONCcdi61btQ';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 43.472935,
                longitude: -80.5396,
                zoom: 18.55,
                bearing: 0,
                pitch: 0,
                width: 800,
                height: 800,
            }
        }
    }

    render() {
        const {viewport} = this.state;

        return(
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={TOKEN}>
                <div className={styles.navStyle}>
                    <NavigationControl />
                </div>
            </MapGL>
        );
    }
}