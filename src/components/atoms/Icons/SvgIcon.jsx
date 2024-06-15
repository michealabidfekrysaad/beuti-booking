import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../config/Helpers/AbsoluteUrl";

const SvgIcon = ({ src, className }) => {
  return (
    <div className={className}>
      <SVG src={toAbsoluteUrl(src)} />
    </div>
  );
};

export default SvgIcon;
