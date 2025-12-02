import React from "react";
import ItemCard from "./ItemCard";
import ItemCardDrone from "./itemCardDrone";

const CardBody = ({ data, handleDeleteDrone, type }) => {
  return (
    <div className="d-flex flex-column h-75 gap-2 mt-2 overflow-y-hidden overflow-y-scroll scrollbar">
      {data.map((drone) =>
        type == "cardDrone" ? (
          <ItemCard
            modelo={drone.droneFabri.modelo}
            localizacao={drone.localizacao}
            tempoAtividade={drone.tempoEmHoras}
            status={drone.status}
            Id={drone.droneId}
            handleDeleteDrone={handleDeleteDrone}
          />
        ) : (
          <ItemCardDrone
            key={drone.droneId}
            drone={drone}
            handleDeleteDrone={handleDeleteDrone}
          />
        )
      )}
    </div>
  );
};

export default CardBody;
