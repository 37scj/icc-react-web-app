import React from 'react';
import map from './map.png';

function Tracking() {
  return (
    <div className="Tracking">
      <h3>Tracking drone</h3>
      <img alt="Mapa mostrando onde estão os drones" src={map} style={{'width': '100%'}}/>
    </div>
  );
}

export default Tracking;
