import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../index.css';
import WheaterAPI from './WheaterAPI';

export default class Map extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        lng: 20.3068,
        lat: 63.8207,
        zoom: 9
      };
      this.mapContainer = React.createRef();
    }
    componentDidMount() {
      const { lng, lat, zoom } = this.state;
      const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });
  
      map.on('move', () => {
        this.setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    }
    
    render() {
      const { lng, lat, zoom } = this.state;
      return (
        <div className='map'>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={this.mapContainer} className="map-container" />
        </div>
      );
    }
  }