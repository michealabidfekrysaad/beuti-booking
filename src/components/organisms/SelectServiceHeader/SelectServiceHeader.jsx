import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import ToggleServices from "../../molecules/ToggleServices/ToggleService";
import ServiceSlider from "../ServiceSlider/ServiceSlider";
import "./SelectServiceHeader.scss";
const SelectServiceHeader = ({ categories, handleChange, value }) => {
  const { messages } = useIntl();
  const { bookingData } = useContext(BookingContext);

  return (
    <>
      <div className="scrollHelper" />
      <section className="selectserviceheader">
        <Row className="justify-content-between align-items-center">
          <Col xs="auto" className="">
            <h2 className="selectserviceheader-header">
              <span>{messages["selectservice.tabs.select"]}</span>
              <div className="current-step">
                ({messages["common.step"]}{" "}
                <span className="mx-1">1 / {bookingData.atHome ? 5 : 4}</span>)
              </div>
            </h2>
          </Col>
          <Col xs="auto" className="mb-2">
            <ToggleServices />
          </Col>
          <Col xs="12">
            <ServiceSlider
              categories={categories}
              handleChange={handleChange}
              value={value}
            />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default SelectServiceHeader;
