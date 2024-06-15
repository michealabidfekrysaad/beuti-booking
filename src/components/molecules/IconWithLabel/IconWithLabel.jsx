import PropTypes from "prop-types";
import Icons from "../../atoms/Icons/Icons";
import "./IconWithLabel.scss";

export default function IconWithLabel({ label, className }) {
  return (
    <span className={className}>
      <Icons />
      <label>{label}</label>
    </span>
  );
}

IconWithLabel.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

IconWithLabel.defaultProps = {
  label: "Salon",
  className: "holder-icon",
};
