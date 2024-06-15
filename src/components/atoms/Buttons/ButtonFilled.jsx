import PropTypes from "prop-types";
import "./Buttons.scss";

const ButtonFilled = ({
  color,
  size,
  className,
  onClick,
  text,
  disabled,
  loading,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className={`beuti-btn ${color} ${size} ${className}`}
      disabled={disabled}
      type={type}
    >
      {loading ? (
        <div className="spinner-border spinner-border-sm mb-1" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        text
      )}{" "}
    </button>
  );
};
ButtonFilled.propTypes = {
  color: PropTypes.oneOf([
    "primary-btn",
    "danger-btn",
    "success-btn",
    "outline-btn",
  ]),
  size: PropTypes.oneOf(["btn-sm", "btn-md", "btn-lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  loading: PropTypes.bool,
  disabled: PropTypes.oneOf([true, false]),
  type: PropTypes.string,
};

ButtonFilled.defaultProps = {
  color: "primary-btn",
  size: "btn-md",
  onClick: null,
  text: "Submit",
  disabled: false,
  loading: false,
  type: "button",
};
export default ButtonFilled;
