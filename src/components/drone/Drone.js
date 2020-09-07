import React from 'react';
import { useFormInput } from '../../helpers/hooks';
import { Row, Button, Container } from 'react-bootstrap';

export default function Drone() {
    const drone = {
        id: useFormInput(1),
        name: useFormInput('Drone 1'),
        latitude: useFormInput(48.8882),
        longitude: useFormInput(47.243232),
        temperature: useFormInput(29.2),
        humidity: useFormInput(45.3),
        tracking: useFormInput(false),
    }

    return (<Container>
        <Row xl={2}>
            <label>Drone ID</label>
            <span aria-label="ID Drone">{drone.id.value}</span>
        </Row>
        <Row xs={2}>
            <label>Name:</label>
            <input {...drone.name} />
        </Row>
        <Row xs={2}>
            <label>Latitude</label>
            <input aria-label="Latitude" {...drone.latitude} />
        </Row>
        <Row xs={2}>
            <label>Longitude</label>
            <input aria-label="Longitude" {...drone.longitude} />
        </Row>
        <Row xs={2}>
            <label>Humidity</label>
            <input aria-label="Humidity" {...drone.humidity} />
        </Row>
        <Row xs={2}>
            <label>Tracking</label>
            <input aria-label="Tracking" type="checkbox" {...drone.tracking} />
        </Row>
    </Container>);

}
