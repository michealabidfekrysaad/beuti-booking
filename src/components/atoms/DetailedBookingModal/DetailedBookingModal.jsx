import React from "react";
import { Col, Modal } from "react-bootstrap";
import ButtonFilled from "../../atoms/Buttons/ButtonFilled";
import PropTypes from "prop-types";
import "./DetailedBookingModal.scss";
import { useIntl } from "react-intl";

export default function DetailedBookingModal({
  setOpen,
  open,
  handleSubmit,
  saftyList,
}) {
  const { messages } = useIntl();
  return (
    <>
      <Modal show={open} onHide={() => setOpen(false)} className="beuti-modal">
        <Modal.Header className="beuti-modal_header">
          <div className="beuti-modal_header-title">
            {messages["safety.modal.title"]}
          </div>
          <div className="beuti-modal_header-sub-title">
            {messages["safety.modal.description"]}
          </div>
        </Modal.Header>
        <Modal.Body className="beuti-modal_body">
          {saftyList?.map((service) => (
            <div className="mb-3">
              <Col xs={12} className="beuti-modal_body-title">
                {service?.name}
              </Col>
              <Col xs={12} className="beuti-modal_body-desc">
                {service.requirement}
              </Col>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="beuti-modal_footer-one-btn">
          <ButtonFilled
            onClick={handleSubmit}
            size="btn-md"
            className="w-100"
            text="Agree and Continue booking"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
DetailedBookingModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

DetailedBookingModal.defaultProps = {
  setOpen: () => {},
  open: false,
};
