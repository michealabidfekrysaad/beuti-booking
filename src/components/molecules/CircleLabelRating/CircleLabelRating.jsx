import RatingStar from "components/atoms/RatingStar/RatingStar";
import RoundedCircle from "components/atoms/RoundedCircle/RoundedCircle";
import React from "react";
import PropTypes from "prop-types";
import "./CircleLabelRating.scss";

export default function CircleLabelRating({
  image,
  empName,
  empInfo,
  ratingNum,
}) {
  return (
    <div className="emp">
      <RoundedCircle image={image} />
      <div className="emp-data">
        <div className="emp-data_title">{empName}</div>
        <div className="emp-data_sub--title">{empInfo}</div>
      </div>
      {ratingNum && (
        <div className="emp-rate">
          <RatingStar staticNumber={ratingNum} precision={1} />
        </div>
      )}
    </div>
  );
}

CircleLabelRating.propTypes = {
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  empName: PropTypes.string,
  empInfo: PropTypes.string,
  ratingNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
