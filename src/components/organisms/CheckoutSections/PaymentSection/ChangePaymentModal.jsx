import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./PaymentSection.scss";
import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import RoundedCheckbox from "components/atoms/RounedCheckbox/RoundedCheckbox";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { useIntl } from "react-intl";

export default function ChangePaymentModal({
  setOpenchangePayment,
  openChnagePayment,
  setSelectedPayment,
  selectedPaymnet,
  allPaymentDetails,
}) {
  const [temproraySelect, setTemproraySelect] = useState(selectedPaymnet);
  const { messages } = useIntl();
  useEffect(() => {
    setTemproraySelect(selectedPaymnet);
  }, [selectedPaymnet]);
  return (
    <Modal
      show={openChnagePayment}
      onHide={() => setOpenchangePayment(false)}
      className="beuti-modal"
    >
      <Modal.Header className="beuti-modal_header">
        <div className="beuti-modal_header-title">
          {messages["payment.method"]}
        </div>
        <div className="beuti-modal_header-sub-title">
          {messages["payment.which.select"]}
        </div>
      </Modal.Header>
      <Modal.Body className="beuti-modal_body">
        {allPaymentDetails
          ?.filter((pay) => pay?.paymentMethodId !== 3)
          ?.map((pay) => (
            <div
              className={`${
                pay?.isEnabled ? `holder` : `holder disable--label`
              }`}
              key={pay?.paymentMethodId}
            >
              <div>
                <RoundedCheckbox
                  label={pay?.name}
                  labelClass={`${
                    pay?.isEnabled ? `holder-label` : `holder-label--disabled`
                  }`}
                  value={pay?.paymentMethodId}
                  checked={pay?.paymentMethodId === temproraySelect}
                  onChange={(e) => setTemproraySelect(+e?.target?.value)}
                  name={pay?.name}
                  disabled={!pay?.isEnabled}
                />
              </div>
              <div className="holder-logo">
                <img alt="pay" src={pay?.image} />
              </div>
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer className="beuti-modal_footer-two-btn">
        <ButtonFilled
          onClick={() => setOpenchangePayment(false)}
          size="btn-md"
          text={messages["common.cancel"]}
          color="outline-btn"
        />
        <ButtonFilled
          onClick={() => {
            setSelectedPayment(temproraySelect);
            setOpenchangePayment(false);
          }}
          size="btn-md"
          text={messages["payment.change"]}
        />
      </Modal.Footer>
    </Modal>
  );
}

ChangePaymentModal.propTypes = {
  setOpen: PropTypes.func,
  openChnagePayment: PropTypes.bool,
};

ChangePaymentModal.defaultProps = {
  setOpen: () => {},
  openChnagePayment: false,
};
