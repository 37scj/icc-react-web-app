import React, { useState } from 'react';
import { Switch, FormControlLabel, Container, Slider, Typography, Box } from '@material-ui/core';

export default (props) => {
    const drone = {
        id: useFormInput(props.id ? props.id : 1),
        name: useFormInput(props.name ? props.name : 'Drone 1'),
        latitude: useFormInput(48.8882),
        longitude: useFormInput(47.243232),
        temperature: useFormInput(29.2),
        humidity: useFormInput(45.3),
        tracking: useFormInput(false),
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

    return (<Container className="boxDrone">
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
    </Container>);

}
