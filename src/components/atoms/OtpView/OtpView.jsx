import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import OtpInput from "react-otp-input";
import PropTypes from "prop-types";
import ButtonFilled from "../Buttons/ButtonFilled";
import "./OtpView.scss";

const OtpView = ({
  value,
  setter,
  loading,
  resend,
  timer,
  showSubmitBtn,
  showResendBtn,
  callOtpConfirm = () => {},
}) => {
  const { messages } = useIntl();
  useEffect(() => {
    if (!value?.includes("-") && value?.length === 4) {
      setTimeout(() => {
        callOtpConfirm();
      }, 200);
    }
  }, [value, callOtpConfirm]);

  return (
    <>
      <Row>
        <Col xs="12">
          <div className="beuti-otp">
            <OtpInput
              numInputs={4}
              value={value}
              onChange={(e) => setter(e)}
              className="beuti-otp__item"
            />
          </div>
        </Col>
      </Row>
      {showSubmitBtn && (
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <ButtonFilled
              type="submit"
              disabled={value.length < 4 || value.includes("-") || loading}
              className="px-5"
              loading={loading}
              text={messages["common.submit"]}
            />
          </Col>
        </Row>
      )}
      {showResendBtn && (
        <Row className="justify-content-center mt-5">
          <Col xs="12" className="beuti-otp__timer">
            <button
              className={`beuti-otp__${
                timer === 0 ? "no-timer-button" : "timer-button"
              }`}
              type="button"
              disabled={timer !== 0 || loading}
              onClick={resend}
            >
              {timer === 0 && messages["verificateion.otp.resend"]}
              {timer !== 0 &&
                `${messages["verificateion.otp.resend"]} (${timer}${messages["common.second"]})`}
            </button>
          </Col>
        </Row>
      )}
    </>
  );
};
OtpView.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  setter: PropTypes.func,
  resend: PropTypes.func,
  loading: PropTypes.bool,
  timer: PropTypes.number,
  showSubmitBtn: PropTypes.bool,
  showResendBtn: PropTypes.bool,
  callOtpConfirm: PropTypes.func,
};

export default OtpView;
