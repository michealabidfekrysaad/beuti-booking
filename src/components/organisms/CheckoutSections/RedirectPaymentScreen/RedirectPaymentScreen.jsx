import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import "./RedirectPaymentScreen.scss";

export default function RedirectPaymentScreen({
  // setOpenRedirectModal,
  openRedirectModal = true,
}) {
  return (
    <Modal
      show={openRedirectModal}
      // onHide={() => setOpenRedirectModal(true)}
      className="beuti-modal"
      centered
      size="md"
    >
      <Modal.Body className="beuti-modal_body">
        <div className="redirect">
          <Spinner
            animation="border"
            className="redirect-spinner"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className="redirect-title">Redirecting to payment screen</div>
          <div className="redirect-sub--title">
            Don’t close this screen it will take seconds
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
