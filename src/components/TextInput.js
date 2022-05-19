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

    // När användaren matat in giltiga värder på år och månad
    // Skickar parametrarna till apiet
    if (year >= 1991 && year <= 2021 && month >= 1 && month <= 12 && lng !== '' && lat !== '') {
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
                  <option value='1991'>1991</option>
                  <option value='1992'>1992</option>
                  <option value='1993'>1993</option>
                  <option value='1994'>1994</option>
                  <option value='1995'>1995</option>
                  <option value='1996'>1996</option>
                  <option value='1997'>1997</option>
                  <option value='1998'>1998</option>
                  <option value='1999'>1999</option>
                  <option value='2000'>2000</option>
                  <option value='2001'>2001</option>
                  <option value='2002'>2002</option>
                  <option value='2003'>2003</option>
                  <option value='2004'>2004</option>
                  <option value='2005'>2005</option>
                  <option value='2006'>2006</option>
                  <option value='2007'>2007</option>
                  <option value='2008'>2008</option>
                  <option value='2009'>2009</option>
                  <option value='2010'>2010</option>
                  <option value='2011'>2011</option>
                  <option value='2012'>2012</option>
                  <option value='2013'>2013</option>
                  <option value='2014'>2014</option>
                  <option value='2015'>2015</option>
                  <option value='2016'>2016</option>
                </select>
              </div>


              <div className='inputMonth'>
                <select
                  type='number'
                  placeholder="MM"
                  value={month}
                  onChange={this.handleChangeMonth}
                >
                  <option value='1'>January</option>
                  <option value='2'>February</option>
                  <option value='3'>Mars</option>
                  <option value='4'>April</option>
                  <option value='5'>May</option>
                  <option value='6'>June</option>
                  <option value='7'>July</option>
                  <option value='8'>August</option>
                  <option value='9'>September</option>
                  <option value='10'>Oktober</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
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
                  <option value='1991'>1991</option>
                  <option value='1992'>1992</option>
                  <option value='1993'>1993</option>
                  <option value='1994'>1994</option>
                  <option value='1995'>1995</option>
                  <option value='1996'>1996</option>
                  <option value='1997'>1997</option>
                  <option value='1998'>1998</option>
                  <option value='1999'>1999</option>
                  <option value='2000'>2000</option>
                  <option value='2001'>2001</option>
                  <option value='2002'>2002</option>
                  <option value='2003'>2003</option>
                  <option value='2004'>2004</option>
                  <option value='2005'>2005</option>
                  <option value='2006'>2006</option>
                  <option value='2007'>2007</option>
                  <option value='2008'>2008</option>
                  <option value='2009'>2009</option>
                  <option value='2010'>2010</option>
                  <option value='2011'>2011</option>
                  <option value='2012'>2012</option>
                  <option value='2013'>2013</option>
                  <option value='2014'>2014</option>
                  <option value='2015'>2015</option>
                  <option value='2016'>2016</option>
                </select>
              </div>


              <div className='inputMonth'>
                <select
                  type='number'
                  placeholder="MM"
                  value={month}
                  onChange={this.handleChangeMonth}
                >
                  <option value='1'>January</option>
                  <option value='2'>February</option>
                  <option value='3'>Mars</option>
                  <option value='4'>April</option>
                  <option value='5'>May</option>
                  <option value='6'>June</option>
                  <option value='7'>July</option>
                  <option value='8'>August</option>
                  <option value='9'>September</option>
                  <option value='10'>Oktober</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
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