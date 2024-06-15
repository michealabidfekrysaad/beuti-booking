import React from "react";
import { Col, Modal } from "react-bootstrap";
import ButtonFilled from "../Buttons/ButtonFilled";
import PropTypes from "prop-types";
import "./SupportedCitiesModal.scss";
import { FormattedMessage, useIntl } from "react-intl";

export default function SupportedCitiesModal({ setOpen, open, list }) {
  const { messages } = useIntl();
  return (
    <Modal show={open} onHide={() => setOpen(false)} className="beuti-modal">
      <Modal.Header className="beuti-modal_header">
        <div className="beuti-modal_header-title">
          {messages["invoice.supported.cities"]}
        </div>
        <div className="beuti-modal_header-sub-title">
          {messages["invoice.supported.cities.hint"]}
        </div>
      </Modal.Header>
      <Modal.Body className="beuti-modal_body">
        {list?.map((city) => (
          <Col xs={12} className="beuti-modal_body-data mb-3" key={city?.id}>
            <div className="beuti-modal_body-data_city">{city.name}</div>
            <div
              className={`beuti-modal_body-data_${
                city.price ? "has" : "no"
              }-price`}
            >
              <FormattedMessage
                id="price.label.current"
                values={{ price: city.price }}
              />
            </div>
          </Col>
        ))}
      </Modal.Body>
      <Modal.Footer className="beuti-modal_footer-one-btn">
        <ButtonFilled
          onClick={() => setOpen(false)}
          size="btn-md"
          className="w-100"
          text={messages["city.modal.btn"]}
        />
      </Modal.Footer>
    </Modal>
  );
}

SupportedCitiesModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

SupportedCitiesModal.defaultProps = {
  setOpen: () => {},
  open: false,
};
