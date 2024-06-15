import React, { useState } from "react";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import "./RatingStar.scss";

export default function RatingStar({
  showNumber,
  name,
  precision,
  numStars,
  labelsObject,
  readOnly,
  staticNumber,
}) {
  const [value, setValue] = useState(0.5);
  const [hover, setHover] = useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labelsObject[value]}`;
  }

  return (
    <div className="stars-holder">
      <Rating
        name={name}
        value={value}
        precision={precision}
        getLabelText={getLabelText}
        max={numStars}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        readOnly={readOnly}
      />
      {value !== null && showNumber && !readOnly && (
        <div className="stars-holder_num">
          {labelsObject[hover !== -1 ? hover : value]}
        </div>
      )}
      {readOnly && staticNumber && (
        <div className="stars-holder_num">{staticNumber}</div>
      )}
    </div>
  );
}

RatingStar.propTypes = {
  showNumber: PropTypes.bool,
  name: PropTypes.string,
  precision: PropTypes.number,
  numStars: PropTypes.number,
  labelsObject: PropTypes.object,
  readOnly: PropTypes.bool,
  staticNumber: PropTypes.string,
};

RatingStar.defaultProps = {
  showNumber: false,
  name: "stars-controll",
  precision: 0.5,
  numStars: 1,
  labelsObject: {
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.5",
    5: "5",
  },
  readOnly: true,
  staticNumber: "1",
};
