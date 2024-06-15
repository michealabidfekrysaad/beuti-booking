import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import SvgIcon from "../../atoms/Icons/SvgIcon";
import "./RemaningDays.scss";

const RemaningDays = ({ size, className, onClick, text, dark = false }) => {
  const { messages } = useIntl();
  return (
    <div
      onClick={onClick}
      className={`remaningDays  ${size} ${className} ${dark && "dark"}`}
    >
      <SvgIcon src="/Icons/clock.svg" className="remaningDays-tag" />
      {text} {messages["common.days.remaining"]}
    </div>
  );
};
RemaningDays.propTypes = {
  size: PropTypes.oneOf(["remaning-sm", "remaning-md"]),
  className: PropTypes.string,
  text: PropTypes.string,
};

RemaningDays.defaultProps = {
  size: "remaning-md",
  text: "3 days Remaning",
};
export default RemaningDays;
