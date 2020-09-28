import React, { useState } from 'react';
import Drone from '../../components/drone/Drone';
import Grid from '@material-ui/core/Grid';

function Home() {

  const drone1 = {id:'1', name:'Drone X'};
  const drones=[drone1];
  const [nome, setNome] = useState("");

  async function fetch(){
    // setDrones([drone1]);
  }

  ///fetch();

  function add() {
    drones.push({'id':drones.length, 'name': nome});
  }

  return (
    <div className="Home">
      <Grid container item spacing={30}>
        <input value={nome} onChange={e=>setNome(e.target.value)}/>
        <button className="add" onClick={add()}>Add Drone</button>
      </Grid>
      {/* <Drone id={1} name="Drone fixo"/> */}
      <Grid container spacing={30}>
          {drones.map((drone,i)=>
            <Drone key={i} id={drone.id} name={drone.name}/>
          )}
      </Grid>
    </div>
  );
}

export default Home;
