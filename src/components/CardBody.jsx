import React from "react";
import ItemCard from "./ItemCard";

const CardBody = ({ data }) => {
  return (
    <div className="d-flex flex-column h-75 gap-2 mt-2 overflow-y-scroll">
      {data.map((drone) => (
          <ItemCard modelo={drone.droneFabri.modelo} localizacao={drone.localizacao} tempoAtividade={drone.tempoEmHoras} status={drone.status} />
      ))

      
      }
    </div>
  );
};

export default CardBody;
