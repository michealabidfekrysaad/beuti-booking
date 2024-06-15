import SvgIcon from "components/atoms/Icons/SvgIcon";
import CircleLabelRating from "components/molecules/CircleLabelRating/CircleLabelRating";
import React from "react";
import PropTypes from "prop-types";
import "./LocationItem.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { Col, Row } from "react-bootstrap";

export default function LocationItem({ onClick, address }) {
  const { locale } = useIntl();
  return (
    <button
      className="locationitem"
      type="button"
      disabled={!address?.isCityServicable}
      onClick={(e) => onClick(address)}
    >
      <Row className="locationitem-wrapper">
        <Col xs="11" className="locationitem-wrapper__info">
          <h2 className="locationitem-wrapper__info-name">
            {address?.locationName}
          </h2>
          <p className="locationitem-wrapper__info-address">
            {address?.address}
          </p>
        </Col>
        <Col xs="auto">
          <SvgIcon
            src={`/Icons/arrow${locale === "en" ? "Right" : "Left"}.svg`}
          />
        </Col>
        {+address?.branchCityFees > 0 && (
          <Col xs="12">
            <div className="locationitem-wrapper__info-alert">
              <FormattedMessage
                id="location.selected.extra"
                values={{ price: address?.branchCityFees }}
              />
            </div>
          </Col>
        )}
        {!address?.isCityServicable && (
          <Col xs="12">
            <div className="locationitem-wrapper__info-alert">
              <FormattedMessage id="location.notSupported" />
            </div>
          </Col>
        )}
      </Row>
    </button>
  );
}

LocationItem.propTypes = {
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  empName: PropTypes.string,
  empInfo: PropTypes.string,
  ratingNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.number,
  isFrom: PropTypes.bool,
};
