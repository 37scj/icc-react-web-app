import React, { useState } from 'react';
import GoogleMapWrap from '../../components/GoogleMap/GoogleMapWrap';
// import map from './map.png';

function Tracking() {
  const [markers, setMarkers] = useState([]);

  const url = [
    // Length issue
    `https://gist.githubusercontent.com`,
    `/farrrr/dfda7dd7fccfec5474d3`,
    `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
  ].join("");

  async function getMarkers(url){
    console.log(url);  
    debugger
    const res = await fetch(url),
      data = await res.json()
      setMarkers(data.photos);
    }(url)
  // fetch(url).then(r => r.json().then(r => setMarkers(r.photos)));

  setMarkers(getMarkers(url));

  return (
    <div className="Tracking">
      <h3>Tracking drone</h3>
      <GoogleMapWrap keyName="photo_id" markers={markers} />
      {/* <img alt="Mapa mostrando onde estão os drones" src={map} style={{ 'width': '100%' }} /> */}
      markers: {JSON.stringify(markers)}
    </div>
  );
}

export default Tracking;
