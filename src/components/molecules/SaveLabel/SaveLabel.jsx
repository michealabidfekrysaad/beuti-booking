import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import SvgIcon from "../../atoms/Icons/SvgIcon";
import "./SaveLabel.scss";

const SaveLabel = ({ size, className, onClick, upTo, discount }) => {
  return (
    <div onClick={onClick} className={`saveLabel  ${size} ${className}`}>
      <SvgIcon src="/Icons/tag.svg" className="saveLabel-tag" />
      <FormattedMessage
        // id={upTo ? "discount.upTo" : "discount"}
        id="discount.upTo"
        values={{ percntage: discount }}
      />
    </div>
  );
};
SaveLabel.propTypes = {
  size: PropTypes.oneOf(["label-sm", "label-md"]),
  className: PropTypes.string,
  text: PropTypes.string,
};

SaveLabel.defaultProps = {
  size: "label-md",
};
export default SaveLabel;
