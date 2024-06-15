import SvgIcon from "components/atoms/Icons/SvgIcon";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const NoSavedLocation = () => {
  return (
    <Row className="nosavedaddress">
      <Col xs="auto">
        <SvgIcon src={"/Images/nosavedlocation.svg"} />
      </Col>
      <Col xs="auto">
        <h2 className="nosavedaddress-header">
          <FormattedMessage id="location.noSavedLocation" />
        </h2>
      </Col>
      <Col xs="8">
        <p className="nosavedaddress-description">
          <FormattedMessage id="location.noSavedLocation.add" />
        </p>
      </Col>
    </Row>
  );
};

export default NoSavedLocation;
