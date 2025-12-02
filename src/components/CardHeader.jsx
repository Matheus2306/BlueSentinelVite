import React from "react";
import DroneLinkModal from "./DroneLinkModal";

const CardHeader = ({
  title,
  btnText,
  modalId = "droneLinkModal",
  onLinkDrone,
  noneBtn
}) => {
  return (
    <div className="mt-2 border-bottom border-dark d-flex justify-content-between align-items-center py-2">
      <span className="fs-4 text-black-50 mx-2">{title}</span>
      <button
        hidden={noneBtn}
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {btnText}
      </button>
      <DroneLinkModal modalId={modalId} onLinkDrone={onLinkDrone} />
    </div>
  );
};

export default CardHeader;
