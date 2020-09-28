import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Slider, Typography, Grid, FormLabel, Container, Input, InputLabel } from '@material-ui/core';
import droneService from '../../services/droneService';
import style from './drone.module.css';
import { Label } from '@material-ui/icons';

export default (props) => {
    console.log(props)
    const drone = {
        id: useFormInput(props.id ? props.id : 1),
        nome: useFormInput(props.nome ? props.nome : 'Drone 1'),
        latitude: useFormInput(props.latitude ? props.latitude : 48.8882),
        longitude: useFormInput(props.longitude ? props.longitude : 47.243232),
        temperatura: useFormInput(props.temperatura ? props.temperatura : 29.2),
        umidade: useFormInput(props.umidade ? props.umidade : 45.3),
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
            nome: drone.nome.value,
            latitude: drone.latitude.value,
            longitude: drone.longitude.value,
            temperatura: drone.temperatura.value,
            umidade: drone.umidade.value,
        };

        console.log(data);

        droneService.saveDrone(data)
            .then(data => console.log(data))
            .catch(error => console.log(error));

    };

    function deleteDrone() {
        droneService.deleteDrone(drone.id.value)
        .then(a=> fetchDrone() );
    }
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


// container xs={12} spacing={1} className={style.drone} alignContent="center" justify="space-between" alignItems="center"
    return (<React.Fragment>
            <Grid item xs={12} className={style.dronetitle}>
                <label style={{ color: 'white' }}>Drone ID {drone.id.value}</label>
            </Grid>
        <Container maxWidth="lg" style={{minwidth:'200px'}} className={style.drone}>
            <Grid  className="MuiInputBase-root MuiInput-root MuiInput-underline">
                <FormLabel>Nome</FormLabel>
                <input className="MuiInputBase-input MuiInput-input" label="Name" aria-label="Drone name" {...drone.nome} />
            </Grid>
            <Grid xs={12} className="MuiInputBase-root MuiInput-root MuiInput-underline">
                <FormLabel>Latitude</FormLabel>
                <input className="MuiInputBase-input MuiInput-input" {...drone.latitude} />
            </Grid>
            <Grid xs={12} alignContent="stretch" className="MuiInputBase-root MuiInput-root MuiInput-underline">
                <FormLabel>Longitude</FormLabel>
                <input className="MuiInputBase-input MuiInput-input" {...drone.longitude} />
            </Grid>
            <Grid xs={12} alignItems="center" className="MuiInputBase-root MuiInput-root MuiInput-underline">
                <FormLabel>Temperature</FormLabel>
                <input className="MuiInputBase-input MuiInput-input" {...drone.temperatura} />
                <Slider
                    {...drone.temperatura}
                    step={0.1} min={-25} max={40}
                    marks={[-12, 0, 12, 22, 32]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={v => v + '°C'}
                    getAriaValueText={() => drone.temperatura.value}
                />
            </Grid>
            <Grid xs={12} className="MuiInputBase-root MuiInput-root MuiInput-underline">
                <FormLabel>Umidade</FormLabel>
                <input className="MuiInputBase-input MuiInput-input" {...drone.umidade} />
                <Slider
                    {...drone.umidade}
                    labelplacement="start"
                    step={0.1} min={0} max={100}
                    marks={[10,20,30,40,50,60,70,80,90]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={v => drone.umidade.value + '%'}
                    getAriaValueText={() => drone.umidade.value}
                />
            </Grid>
            <Grid xs={12} spacing={1}>
                <FormControlLabel
                    control={<Switch {...drone.tracking} />}
                    labelPlacement="start" label="Tracking"
                />
            </Grid>
            <Grid xs={12} spacing={1}>
                <button onClick={() => update()}>Atualizar drone '{drone.nome.value}'</button>
                <button onClick={() => deleteDrone()}>Excluir drone '{drone.nome.value}'</button>
                
            </Grid>
        </Container>
    </React.Fragment>
    );

}
