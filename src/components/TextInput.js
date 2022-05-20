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
      zoom: 3
    };
    // Skapar kartan
    this.mapContainer = React.createRef();
  }

  // Omrenderar sidan när kartan uppdateras
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/tildaengberg/cl38ffigc004l14qvhpckuhx2',
      center: [lng, lat],
      zoom: zoom
    });

    // Markören och sparar koordinater
    const marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([lng, lat]).addTo(map);


    // Sätter koorinaterna uppdaterar states
    marker.on('dragend', () => {
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

    this.years = function (startYear) {
      var currentYear = new Date().getFullYear() - 1 , years = [];
      startYear = startYear || 1980;
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years;
    }

    const months = [
      { value: '1', text: 'January' },
      { value: '2', text: 'February' },
      { value: '3', text: 'Mars' },
      { value: '4', text: 'April' },
      { value: '5', text: 'May' },
      { value: '6', text: 'June' },
      { value: '7', text: 'July' },
      { value: '8', text: 'August' },
      { value: '9', text: 'September' },
      { value: '10', text: 'Oktober' },
      { value: '11', text: 'November' },
      { value: '12', text: 'December' }
    ];


    // När användaren matat in giltiga värder på år och månad
    // Skickar parametrarna till apiet
    if (year !== '' && month !== '' && lng !== '' && lat !== '') {
      return (
        <div className='map'>

          <div ref={this.mapContainer} className="map-container">

            <div className='wrapper'>

              <div className='text-info'>
                <h3>Weather Map</h3>
                <p>Move the map marker to start exploring the weather.</p>
              </div>

              <div className='inputYear'>
                <select
                  type='number'
                  placeholder="YYYY"
                  value={year}
                  onChange={this.handleChangeYear}
                >
                  {this.years(2019 - 38).map(item => {
                    return (<option value={item}>{item}</option>);
                  })}
                </select>
              </div>

              <div className='inputMonth'>
                <select
                  type='number'
                  placeholder="MM"
                  value={month}
                  onChange={this.handleChangeMonth}
                >
                  {months.map(item => {
                    return (<option key={item.value} value={item.value}>{item.text}</option>);
                  })}
                </select>
              </div>

              <WheaterAPI
                inputYear={parseFloat(year)}
                inputMonth={parseFloat(month)}
                inputLat={parseFloat(lat)}
                inputLng={parseFloat(lng)}
              />
            </div>
          </div>

        </div>

      );
    }


    // När användaren inte matat in något värde
    else {
      return (
        <div className='map'>

          <div ref={this.mapContainer} className="map-container">

            <div className='wrapper'>
              <div className='text-info'>
                <h3>Weather Map</h3>
                <p>Move the map marker to start exploring the weather.</p>
              </div>

              <div className='inputYear'>
                <select
                  type='number'
                  placeholder="YYYY"
                  value={year}
                  onChange={this.handleChangeYear}
                >
                  {this.years(2019 - 38).map(item => {
                    return (<option value={item}>{item}</option>);
                  })}
                </select>
              </div>


              <div className='inputMonth'>
                <select
                  type='number'
                  placeholder="MM"
                  value={month}
                  onChange={this.handleChangeMonth}
                >
                  {months.map(item => {
                    return (<option key={item.value} value={item.value}>{item.text}</option>);
                  })}
                </select>
              </div>

            </div>
          </div>
        </div>
      );
    }

  }
}

export default TextInput