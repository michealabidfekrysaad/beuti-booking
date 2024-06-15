import PropTypes from "prop-types";
import "./ShowBtn.scss";

export default function ShowBtn({ onClick, className, text }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

ShowBtn.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
};
ShowBtn.defaultProps = {
  onClick: () => {},
  className: "show-holder",
  text: "Show Map",
};
