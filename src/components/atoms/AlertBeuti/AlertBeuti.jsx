import React from "react";
import PropTypes from "prop-types";
import "./AlertBeuti.scss";

export default function AlertBeuti({ className, text, alignText }) {
  return <div className={`alert-beuti ${className} ${alignText}`}>{text}</div>;
}

AlertBeuti.propTypes = {
  className: PropTypes.oneOf([
    "alert-danger",
    "alert-primary",
    "alert-success",
    "alert-outline",
  ]),
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  alignText: PropTypes.string,
};

AlertBeuti.defaultProps = {
  className: "alert-danger",
  text: "Alert watch out put your text !!",
  alignText: "text-center",
};
