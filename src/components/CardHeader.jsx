import React from "react";
import DroneLinkModal from "./DroneLinkModal";

const CardHeader = ({
  title,
  btnText,
  modalId = "droneLinkModal",
  onLinkDrone,
  noneBtn,
  noneInput,
  searchValue = "",
  searchPlaceholder = "Buscar por usuário",
  onSearchChange,
}) => {
  const handleSearchChange = (event) => {
    onSearchChange?.(event.target.value);
  };

  return (
    <div className="mt-2 border-bottom border-dark d-flex justify-content-between align-items-center py-2 flex-wrap gap-2">
      <span className="fs-4 text-black-50 mx-2 flex-grow-1">{title}</span>
      <div className="d-flex align-items-center gap-2 ms-auto">
        {!noneInput && (
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={handleSearchChange}
          />
        )}
        {!noneBtn && (
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            {btnText}
          </button>
        )}
      </div>
      {!noneBtn && (
        <DroneLinkModal modalId={modalId} onLinkDrone={onLinkDrone} />
      )}
    </div>
  );
};

export default CardHeader;
