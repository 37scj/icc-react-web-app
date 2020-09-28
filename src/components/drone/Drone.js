import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Slider, Typography, Box, makeStyles, withStyles } from '@material-ui/core';
import droneService from '../../services/droneService';
import style from './drone.module.css';

export default (props) => {
    console.log(props)
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
            id: drone.id.value,
            nome: drone.name.value,
            latitude: drone.latitude.value,
            longitude: drone.longitude.value,
            temperatura: drone.temperature.value,
            umidade: drone.humidity.value,
        };

        console.log(data);

        droneService.saveDrone(data)
            .then(data => console.log(data))
            .catch(error => console.log(error));

    };

    function fetchDrone() {
        droneService.getDrone(drone.id.value)
            .then(d => d.json())
            .then(d => setDrones(d))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDrone();
        }, 10000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, []);



    return (<div className={style.drone}>
        <Box xl={2}>
            <label>Drone ID</label>
            <span aria-label="ID Drone">{drone.id.value}</span>
        </Box>
        <Box xs={2}>
            <label>Drone Name:</label>
            <input aria-label="Drone name" {...drone.name} />
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
        <button onClick={() => update()}>Atualizar drone {drone.name.value}</button>
    </div>);

}
