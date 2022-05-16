import React from 'react'
import WheaterAPI from './WheaterAPI';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../index.css';


// Klassen
class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    // Hantera ändringar
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.state = {
      year: '',
      month: '',
      lng: '',
      lat: '',
      zoom: 9
    };
    // Skapar kartan
    this.mapContainer = React.createRef();
  }

  // Omrenderar sidan när kartan uppdateras
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Markören och sparar koordinater
    const marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([lng, lat]).addTo(map);


    // Sätter koorinaterna uppdaterar states
    marker.on('dragend', () =>{
      this.setState({
        lng: marker.getLngLat().lng,
        lat: marker.getLngLat().lat,
      });
    });
    
  }

  // Sätt nytt state av året
  handleChangeYear(e) {
    this.setState({ year: e.target.value });
  }

  // Sätt nytt state av månaden
  handleChangeMonth(e) {
    this.setState({ month: e.target.value });
  }


  // DET SOM SKA UT PÅ SIDAN
  render() {

    const year = this.state.year;
    const month = this.state.month;
    const { lng, lat, zoom } = this.state;

    // När användaren matat in giltiga värder på år och månad
    // Skickar parametrarna till apiet
    if (year >= 1991 && year <= 2021 && month >= 1 && month <= 12 && lng !== '' && lat !== '') {
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

          <div className='map'>
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={this.mapContainer} className="map-container"/>
          </div>
          <WheaterAPI
            inputYear={parseFloat(year)}
            inputMonth={parseFloat(month)}
            inputLat={parseFloat(lat)}
            inputLng={parseFloat(lng)}
          />
        </div>

      );
    }


    // När användaren inte matat in något värde
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