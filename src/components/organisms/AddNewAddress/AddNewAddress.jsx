import React, { useContext, useEffect } from "react";
import GoogleMap from "google-map-react";
import { FormattedMessage, useIntl } from "react-intl";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import "./AddNewAddress.scss";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { Row, Col } from "react-bootstrap";
import AddLocationForm from "components/organisms/LocationForm/AddLocationForm";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";
import { toast } from "react-toastify";

const AddNewAddress = ({
  bookingData,
  setbookingData,
  handleSelectOnMap,
  handleAutoCompelete,
  callSavedAddress,
}) => {
  const { messages, locale } = useIntl();
  const { handleStepper } = useContext(StepperContext);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        handleSelectOnMap({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      },
      (err) => {
        if (err.code === 2) {
          toast.error(err.message);
        }
        handleSelectOnMap({
          lat: bookingData.latitude,
          lng: bookingData.longitude,
        });
      }
    );
  }, []);
  return (
    <section className="map">
      <Row>
        <Col xs="12">
          <h2 className="map-header">
            <p className="viewstepper_name">
              <button type="button" onClick={() => handleStepper()}>
                <SvgIcon
                  src={`/Icons/arrow${
                    locale === "ar" ? "forward" : "back"
                  }.svg`}
                />
              </button>
            </p>
            <FormattedMessage id="location.addNewAddress" />
            <div className="current-step">
              ({messages["common.step"]}{" "}
              <span className="mx-1">4 / {bookingData.atHome ? 5 : 4}</span>)
            </div>
          </h2>
          <p className="map-description">
            <FormattedMessage id="location.select" />
          </p>
        </Col>

        <Col xs="12" lg="8">
          <div className="map-wrapper">
            <div className="map-wrapper__input-wrapper">
              <ReactGoogleAutocomplete
                apiKey="AIzaSyCXSqY3dwzoUPCPlqZg0Bx8ePReOt4Jbdo"
                onPlaceSelected={handleAutoCompelete}
                className="map-wrapper__input-wrapper--autocompelete"
                placeholder={messages["location.input.place.holder"]}
              />
              <SvgIcon
                src="/Icons/location.svg"
                className="map-wrapper__input-wrapper--icon-map"
              />
            </div>
            <GoogleMap
              bootstrapURLKeys={{
                key: "AIzaSyCXSqY3dwzoUPCPlqZg0Bx8ePReOt4Jbdo",
              }}
              defaultCenter={{
                lat: bookingData.latitude,
                lng: bookingData.longitude,
              }}
              center={{
                lat: bookingData.latitude,
                lng: bookingData.longitude,
              }}
              defaultZoom={16}
              onClick={handleSelectOnMap}
            >
              <SvgIcon
                lat={bookingData.latitude}
                lng={bookingData.longitude}
                src="/Icons/Pin.svg"
                className="map-pin"
              />
            </GoogleMap>
          </div>
        </Col>
        <Col xs="12" lg="4">
          <AddLocationForm
            bookingData={bookingData}
            setbookingData={setbookingData}
            callSavedAddress={callSavedAddress}
          />
        </Col>
      </Row>
    </section>
  );
};

export default AddNewAddress;
