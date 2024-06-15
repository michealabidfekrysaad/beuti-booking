import React from "react";
import { Modal } from "react-bootstrap";
import "./GlobalLoader.scss";

export default function GlobalLoader({ openRedirectModal = true }) {
  return (
    <Modal show={openRedirectModal} className="globalloader" centered size="md">
      <Modal.Body className="beuti-modal_body">
        <div className="globalloader-body">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
