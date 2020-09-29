import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel, Slider, Typography, Grid, FormLabel, Container, Input, InputLabel, Button } from '@material-ui/core';
import droneService from '../../services/droneService';
import style from './drone.module.css';
import { Label } from '@material-ui/icons';

export default (props) => {
    console.log('render', props)
    const drone = {
        id: useFormInput(props.id ? props.id : 1),
        nome: useFormInput(props.nome ? props.nome : 'Drone 1'),
        latitude: useFormInput(props.latitude ? props.latitude : 48.8882),
        longitude: useFormInput(props.longitude ? props.longitude : 47.243232),
        temperatura: useFormInput(props.temperatura ? props.temperatura : 29.2),
        umidade: useFormInput(props.umidade ? props.umidade : 45.3),
        tracking: useFormInput((props.tracking != null || props.tracking != undefined) ? props.tracking : false),
    }
    function setDrone(d) {
        if ((!d || !d.id) && props.fetchDrones) {
            props.fetchDrones();
            return;
        }
        drone.id.onChange(0, d.id);
        drone.nome.onChange(0, d.nome);
        drone.latitude.onChange(0, d.latitude);
        drone.longitude.onChange(0, d.longitude);
        drone.temperatura.onChange(0, d.temperatura);
        drone.umidade.onChange(0, d.umidade);
        drone.tracking.onChange(0, d.tracking);
    }
    function useFormInput(initialValue) {
        const [value, setValue] = useState(initialValue)
        const onChange = (e, newValue) => {
            let v=null;
            if (newValue) {
                v=newValue;
            } else {
                v=(e.target.value);
            }
            setValue(v);
            if (v != value) {
                updateDrone();
            }
    }
        return {
            value,
            onChange
        }
    }

    async function updateDrone() {
        if (drone.id && !drone.id.value) {
            console.error("Drone sem ID");
        }
        const data = {
            id: drone.id.value,
            nome: drone.nome.value,
            latitude: drone.latitude.value,
            longitude: drone.longitude.value,
            temperatura: drone.temperatura.value,
            umidade: drone.umidade.value,
            tracking: drone.tracking.value,
        };

        console.log('updating', drone.id, data);



        await droneService.saveDrone(data)
            .then(data => console.log('save', data))
            .catch(error => console.log(error));

    };

    function deleteDrone() {
        if (drone.id) {
            droneService.deleteDrone(drone.id.value)
                .then(a => a.ok && fetchDrone());
        }
    }

    const fetchDrone = () => {
        console.log('fetchDrone', drone);
        if (drone && drone.id) {
            droneService.getDrone(drone.id.value)
                .then(d => d.json())
                .then(d => setDrone(d))
                .catch(error => console.log(error));
        }
    }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         fetchDrone();
    //     }, 10000);
    //     // Clear timeout if the component is unmounted
    //     return () => clearTimeout(timer);
    // }, []);


    // container xs={12} spacing={1} className={style.drone} alignContent="center" justify="space-between" alignItems="center"
    return (<React.Fragment>
        <Grid item xs={12} className={style.dronetitle}>
            <label style={{ color: 'white' }}>Drone ID {drone.id.value}</label>
        </Grid>
        <Container maxWidth="lg" style={{ minwidth: '200px' }} className={style.drone}>
            <Grid className="MuiInputBase-root MuiInput-root MuiInput-underline">
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
                    marks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
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
            <Grid container justify="space-evenly" xs={12}>
                <Button danger onClick={() => deleteDrone()}>Excluir</Button>
                <Button primary onClick={() => updateDrone()}>Salvar</Button>
                <Button primary onClick={() => fetchDrone()}>Buscar</Button>
            </Grid>
        </Container>
    </React.Fragment>
    );

}
