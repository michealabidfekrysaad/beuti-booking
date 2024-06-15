import SvgIcon from "components/atoms/Icons/SvgIcon";
import CircleLabelRating from "components/molecules/CircleLabelRating/CircleLabelRating";
import React from "react";
import PropTypes from "prop-types";
import "./EmployeeSelection.scss";
import { FormattedMessage, useIntl } from "react-intl";

export default function EmployeeSelection({
  empName,
  empInfo,
  image,
  ratingNum,
  price,
  isFrom,
  onClick,
  id,
}) {
  const { locale } = useIntl();

  return (
    <button className="emp--holder" type="button" onClick={(e) => onClick(id)}>
      <CircleLabelRating
        image={image}
        empName={empName}
        empInfo={empInfo}
        ratingNum={ratingNum}
      />
      <div className="emp--holder-price--section">
        {price && (
          <FormattedMessage
            id={isFrom ? "price.label.from" : "price.label.current"}
            values={{ price: price }}
          />
        )}

        <SvgIcon
          src={`/Icons/arrow${locale === "en" ? "Right" : "Left"}.svg`}
        />
      </div>
    </button>
  );
}

EmployeeSelection.propTypes = {
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  empName: PropTypes.string,
  empInfo: PropTypes.string,
  ratingNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.number,
  isFrom: PropTypes.bool,
};
