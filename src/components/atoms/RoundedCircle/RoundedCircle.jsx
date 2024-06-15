import React from "react";
import PropTypes from "prop-types";
import "./RoundedCircle.scss";

export default function RoundedCircle({ image }) {
  return (
    <div className="round">
      <img
        className="round-img"
        src={image || "/Images/Avatar.png"}
        alt="circle"
      />
    </div>
  );
}

RoundedCircle.propTypes = {
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

RoundedCircle.defaultProps = {
  image: "/images/Avatar.png",
};
