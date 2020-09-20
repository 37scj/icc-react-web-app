import React, { useState, useEffect } from 'react';
import GoogleMapWrap from '../../components/GoogleMap/GoogleMapWrap';
const fetch = require("isomorphic-fetch");
// import map from './map.png';

// fetch(url).then(r => r.json().then(r => setMarkers(r.photos)));

// const data=getMarkers(url);

export default function Tracking() {
  const [markers, setMarkers] = useState([]);

  const fetchMarkers = () => {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>setMarkers(data.photos.slice(10, 20)));
  }

  useEffect(() => fetchMarkers(), []);

  return (<div className="Tracking">
    <h3>Tracking drone</h3>
    <GoogleMapWrap keyName="photo_id" markers={markers} />
    {/* <img alt="Mapa mostrando onde estão os drones" src={map} style={{ 'width': '100%' }} /> */}
    {/* markers: {JSON.stringify(markers)} */}
  </div>
  );
}
