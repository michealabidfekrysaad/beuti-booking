import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import LocationItem from "../LocationItem/LocationItem";
import NoSavedLocation from "./NoSavedLocation";
import "./SavedAddress.scss";
const SavedAddress = ({ savedAddress, handleSelectLocation }) => {
  const { setIsMapView } = useContext(StepperContext);
  const { messages, locale } = useIntl();
  const { handleStepper } = useContext(StepperContext);
  const { bookingData } = useContext(BookingContext);

  return (
    <section className="savedaddress">
      <Row className="align-items-center justify-content-between mb-5">
        <Col xs="auto">
          <h2 className="savedaddress-header">
            <p className="viewstepper_name">
              <button type="button" onClick={() => handleStepper()}>
                <SvgIcon
                  src={`/Icons/arrow${
                    locale === "ar" ? "forward" : "back"
                  }.svg`}
                />
              </button>
            </p>
            <FormattedMessage id="location.savedAddress" />
            <div className="current-step">
              ({messages["common.step"]}{" "}
              <span className="mx-1">4 / {bookingData.atHome ? 5 : 4}</span>)
            </div>
          </h2>
        </Col>
        <Col xs="auto">
          <ButtonFilled
            size="btn-lg"
            text={<FormattedMessage id="location.add" />}
            onClick={() => setIsMapView(true)}
          />
        </Col>
      </Row>
      <Row>
        {savedAddress?.map((address) => (
          <Col xs="12" key={address?.id}>
            <LocationItem address={address} onClick={handleSelectLocation} />
          </Col>
        ))}
        {!savedAddress?.length && (
          <Col xs="12">
            <NoSavedLocation />
          </Col>
        )}
      </Row>
    </section>
  );
};

export default SavedAddress;
