import React, { useEffect, useRef } from "react";
import "../Popup/Popup.css";

export default function Popup({ handleClose, children }) {
  const popupRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.contains(popupRef.current)) {
        handleClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div ref={popupRef}>{children}</div>
      </div>
    </div>
  );
}
