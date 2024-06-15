import React, { useContext } from "react";
import { Col, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./ChangeLocationModal.scss";
import { FormattedMessage } from "react-intl";
import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";

export default function ChangeLocationModal({
  setOpen,
  open,
  handleSwitchServiceLocation,
}) {
  const { bookingData } = useContext(BookingContext);
  return (
    <Modal show={open} onHide={() => setOpen(false)} className="beuti-modal">
      <Modal.Header className="beuti-modal_header">
        <div className="beuti-modal_header-title">
          <FormattedMessage id="toggle.title" />
        </div>
        <div className="beuti-modal_header-sub-title">
          <FormattedMessage
            id="toggle.sub.title"
            values={{
              placeFrom: bookingData?.atHome ? (
                <FormattedMessage id="common.home" />
              ) : (
                <FormattedMessage id="common.salon" />
              ),
              placeTo: !bookingData?.atHome ? (
                <FormattedMessage id="common.home" />
              ) : (
                <FormattedMessage id="common.salon" />
              ),
            }}
          />
        </div>
      </Modal.Header>

      <Modal.Footer className="beuti-modal_footer-two-btn">
        <ButtonFilled
          onClick={() => setOpen(false)}
          size="btn-md"
          className="w-100"
          text={<FormattedMessage id="common.cancel" />}
          color="outline-btn"
        />
        <ButtonFilled
          onClick={handleSwitchServiceLocation}
          size="btn-md"
          className="w-100"
          text={<FormattedMessage id="toggle.yes.change" />}
        />
      </Modal.Footer>
    </Modal>
  );
}

ChangeLocationModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

ChangeLocationModal.defaultProps = {
  setOpen: () => {},
  open: false,
};
