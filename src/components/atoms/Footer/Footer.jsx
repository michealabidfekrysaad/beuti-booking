import React from "react";
import PropTypes from "prop-types";
import "./Footer.scss";
import ButtonFilled from "../Buttons/ButtonFilled";

export default function Footer({
  numberTitle,
  numberSubTitle,
  subTitle,
  title,
  onClick,
  disabled,
  textBtn,
  numServices,
}) {
  return (
    <footer className="footer">
      <div className="footer_data">
        <div className="footer_data-title d-none d-lg-block d-xl-block">
          {numServices}
        </div>
        <div className="footer_data-title d-block d-lg-none d-xl-none">
          {numberTitle} {title}
        </div>
        <div className="footer_data-sub-title">
          {numberSubTitle} {subTitle}
        </div>
      </div>
      <div className="footer_btn">
        <ButtonFilled text={textBtn} onClick={onClick} disabled={disabled} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  numServices: PropTypes.object,
  numberTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  numberSubTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.object,
  subTitle: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  textBtn: PropTypes.object,
};

Footer.defaultProps = {
  numServices: {},
  numberSubTitle: 20,
  subTitle: "sub",
  onClick: () => {},
  disabled: false,
  textBtn: "Book Now",
};
