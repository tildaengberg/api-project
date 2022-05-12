import React, { useState } from 'react'
import WheaterAPI from './WheaterAPI';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../index.css';

class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.state = {
      year: '',
      month: '',
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

    const marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([lng, lat]).addTo(map);


    marker.on('dragend', () =>{
      this.setState({
        lng: marker.getLngLat().lng,
        lat: marker.getLngLat().lat,
      });
    });
    

    /*map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });*/
  }


  handleChangeYear(e) {
    this.setState({ year: e.target.value });
  }

  handleChangeMonth(e) {
    this.setState({ month: e.target.value });
  }


  render() {

    const year = this.state.year;
    const month = this.state.month;
    const { lng, lat, zoom } = this.state;

    if (year >= 1991 && year <= 2021 && month >= 1 && month <= 12) {
      return (
        <div>
          <legend>Enter year: {year}</legend>
          <input
            placeholder="YYYY"
            value={year}
            onChange={this.handleChangeYear} />
          <legend>Enter month: {month}</legend>
          <input
            placeholder="MM"
            value={month}
            onChange={this.handleChangeMonth} />
          <WheaterAPI
            inputYear={parseFloat(year)}
            inputMonth={parseFloat(month)}
            inputLat={lat}
            inputLng={lng}
          />

          <div className='map'>
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={this.mapContainer} className="map-container" />
          </div>
        </div>

      );
    }

    else {
      return (
        <div>
          <legend>Enter year: {year}</legend>
          <input
            type='number'
            placeholder="YYYY"
            value={year}
            onChange={this.handleChangeYear} />
          <legend>Enter month: {month}</legend>
          <input
            type='number'
            placeholder="MM"
            value={month}
            onChange={this.handleChangeMonth} />
          <div className='map'>
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={this.mapContainer} className="map-container" />
          </div>
        </div>
      );
    }

  }
}

export default TextInput