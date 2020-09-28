//import React from 'react';

const isDebug = true;
const urlBase = 'http://localhost:8090';
const headers = {
  'Accept': 'application/json, text/plain',
  'Content-Type': 'application/json'
}

// mode: 'no-cors', // 'cors' by default
function getAllDrones() {
  return fetch(`${urlBase}/drones`, {
    method: 'GET',
    headers: headers,
  }).then(a => {
    if (isDebug) console.log(a);
    return a;
  });
}

function getDrone(id) {
  return fetch(`${urlBase}/drones/${id}`, {
    method: 'GET',
    headers: headers,
  }).then(a => {
    if (isDebug) console.log(a);
    return a;
  });
}
function deleteDrone(id) {
  return fetch(`${urlBase}/drones/${id}`, {
    method: 'DELETE',
    headers: headers,
  }).then(a => {
    if (isDebug) console.log(a);
    return a;
  });
}

function saveDrone(drone) {
  return fetch(`${urlBase}/drones`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(drone)

  }).then(a => {
    if (isDebug) console.log(a);
    return a;
  });
}

function newDrone(nome) {
  return fetch(`${urlBase}/drones`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ id: 0, nome })
  }).then(a => {
    if (isDebug) console.log(a);
    return a;
  });
}

export default { getAllDrones, getDrone, deleteDrone, saveDrone, newDrone };
