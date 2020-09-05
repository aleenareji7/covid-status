
import React, { useState } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import data from '../data/MapData.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


function MapChart() {
  const [mapData, setMapData] = useState(null);
  return(
    <Map center={[20.5937, 78.9629]} zoom={12}>
     <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />

   {data.regional.map(stateData => (
        <Marker
          key={stateData.properties.loc}
          position={[
            stateData.geometry.coordinates[0],
            stateData.geometry.coordinates[1]
          ]}
          onClick={() => {
            setMapData(stateData);
          }}
        />
      ))}

{mapData && (
        <Popup
          position={[
            mapData.geometry.coordinates[0],
            mapData.geometry.coordinates[1]
          ]}
          onClose={() => {
            setMapData(null);
          }}
        >
          <div>
        <h1>{mapData.properties.loc}</h1>
        <p>Total Cases:{mapData.properties.confirmedCasesIndian}</p>
        <p>Active Cases:{mapData.properties.totalConfirmed}</p>
        <p>Recovered:{mapData.properties.discharged}</p>
        <p>Death Cases:{mapData.properties.deaths}</p>
          </div>
        </Popup>
      )}  

    </Map>
  )
}
export default MapChart;

