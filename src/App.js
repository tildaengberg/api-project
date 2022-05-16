import React from 'react';
import Map from './components/Map'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './index.css';
import TextInput from '../src/components/TextInput'

mapboxgl.accessToken = 'pk.eyJ1IjoidGlsZGFlbmdiZXJnIiwiYSI6ImNsMnl5MzJncjAwOHYzbW54eTFzejg1ZGMifQ.ie_PPWJP64gL1nOeIXtUZQ';

function App() {
  return (
    <div>
      <TextInput/>
    </div>
  )
}

export default App