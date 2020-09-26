import React from 'react';
import Drone from '../../components/drone/Drone';

function Home() {
  const [drones, setDrones] = useState([{id:'1', name:'Drone X'}])

  add(){
    drones.push({id: 2, name: 'Outro'});
    setDrones(drones);
  }

  return (
    <div className="Home">
      <button className="add" onClick={add}>Add Drone</button>
      <Drone id={1} name="Drone fixo"/>
      {drones.map((drone,i)=>
        <Drone key={i} id={drone.id} name={drone.name}/>
      )}
    </div>
  );
}

export default Home;
