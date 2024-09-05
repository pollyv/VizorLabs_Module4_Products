import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import Button from "../Button/Button";

import "./Modal.css";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${className}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="primary"
          size="small"
          onClick={onClose}
          className="modal-close"
        >
          &times;
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;
