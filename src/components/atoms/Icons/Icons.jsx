import PropTypes from "prop-types";
import logo from "../../../../src/logo.svg";
import "./Icons.scss";

export default function Icons({ className, src, alt }) {
  return (
    <span className={className}>
      <img src={src} alt={alt} />
    </span>
  );
}

Icons.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Icons.defaultProps = {
  className: "square-bg",
  src: logo,
  alt: "image",
};
