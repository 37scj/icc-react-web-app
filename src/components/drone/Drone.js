import React, { useState } from 'react';
import { Switch, FormControlLabel, Container, Slider, Typography, Box } from '@material-ui/core';

export default (props) => {
    const drone = {
        id: useFormInput(props.id ? props.id : 1),
        name: useFormInput(props.name ? props.name : 'Drone 1'),
        latitude: useFormInput(props.latitude ? props.latitude : 48.8882),
        longitude: useFormInput(props.longitude ? props.longitude : 47.243232),
        temperature: useFormInput(props.temperature ? props.temperature : 29.2),
        humidity: useFormInput(props.humidity ? props.humidity : 45.3),
        tracking: useFormInput((props.tracking != null || props.tracking != undefined) ? props.tracking : false),
    }

    function useFormInput(initialValue, isSwitch) {
        const [value, setValue] = useState(initialValue)
        const onChange = (e, newValue) => {
            if (newValue) {
                setValue(newValue);
            } else {
                setValue(e.target.value);
            }
        }
        return {
            value,
            onChange
        }
    }

    function update() {
        const data = {
            id: drone.id,
            nome: drone.name,
            latitude: drone.latitude,
            longitude: drone.longitude,
            temperatura: drone.temperature,
            umidade: drone.humidity,
        };

        console.log(JSON.stringify(data));

        fetch('http://localhost:8090/drones', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.log(error));

    };


    return (<div>
        <Box xl={2}>
            <label>Drone ID</label>
            <span aria-label="ID Drone">{drone.id.value}</span>
        </Box>
        <Box xs={2}>
            <label>Name:</label>
            <input {...drone.name} />
        </Box>
        <Box xs={2}>
            <label>Latitude</label>
            <input aria-label="Latitude" {...drone.latitude} />
        </Box>
        <Box xs={2}>
            <label>Longitude</label>
            <input aria-label="Longitude" {...drone.longitude} />
        </Box>
        <Box xs={2}>
            <label>Temperature</label>
            <input aria-label="Temperature" {...drone.temperature} />
            <Typography id="temperature-slider" gutterBottom>Temperature</Typography>
            <Slider
                {...drone.temperature}
                aria-labelledby="temperature-slider"
                step={0.1}
                min={-25}
                max={40}
                valueLabelDisplay="auto"
                valueLabelFormat={v => v + '°C'}
                getAriaValueText={() => drone.temperature.value}
            />
        </Box>
        <Box xs={2}>
            <label>Humidity</label>
            <input aria-label="Humidity" {...drone.humidity} />
            <Typography id="humidity-slider" >Humidity</Typography>
            <Slider
                {...drone.humidity}
                aria-labelledby="humidity-slider"
                labelplacement="start"
                step={0.1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={v => drone.humidity.value + '%'}
                getAriaValueText={() => drone.humidity.value}
            />
        </Box>
        <Box>
            <FormControlLabel
                control={<Switch {...drone.tracking} />}
                labelPlacement="start" label="Tracking"
            />
        </Box>
        <button onClick={update()}>Atualizar drone {drone.name.value}</button>
    </div>);

}
