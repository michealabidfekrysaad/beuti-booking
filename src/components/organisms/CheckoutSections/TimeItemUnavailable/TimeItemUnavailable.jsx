import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ButtonFilled from "../../../atoms/Buttons/ButtonFilled";
import "./TimeItemUnavailable.scss";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { useIntl } from "react-intl";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";

export default function TimeItemUnavailable({
  openUnavailable,
  setOpenUnavailable,
  btnText,
  img,
  title,
  subTitle,
  goStep,
}) {
  const { messages } = useIntl();
  const { setStep } = useContext(StepperContext);

  return (
    <Modal
      show={openUnavailable}
      onHide={() => setOpenUnavailable(false)}
      className="beuti-modal"
      centered
    >
      <Modal.Body className="beuti-modal_body">
        <div className="unavailable">
          <SvgIcon src={img} />
          <div className="unavailable_title">{messages[title]}</div>
          <div className="unavailable_sub--title">{messages[subTitle]}</div>
        </div>
      </Modal.Body>
      <Modal.Footer className="beuti-modal_footer-one-btn">
        <ButtonFilled
          onClick={() => {
            setStep(goStep);
            setOpenUnavailable(false);
          }}
          size="btn-md"
          className="w-100"
          text={messages[btnText]}
        />
      </Modal.Footer>
    </Modal>
  );
}

TimeItemUnavailable.propTypes = {
  img: PropTypes.oneOf(["/Icons/closedDay.svg", "/Icons/noItem.svg"]),
  title: PropTypes.string,
};

TimeItemUnavailable.defaultProps = {
  setOpenUnavailable: () => {},
  openUnavailable: true,
  btnText: "selectAnotherTime",
  img: "/Icons/closedDay.svg",
  title: "Time Unavailabe",
  subTitle:
    "The timeslot you selected for your booking is no longer avaiable Please select another time slot",
};
