import SvgIcon from "../../atoms/Icons/SvgIcon";
import "./Footer.scss";
const Footer = () => {
  return (
    <section className="beutifooter">
      <p>© 2022 Beuti.com </p>
      <div className="d-flex">
        <SvgIcon src="/Icons/facebook.svg" className="beutifooter_icon" />
        <SvgIcon src="/Icons/twitter.svg" className="beutifooter_icon" />
        <SvgIcon src="/Icons/instagram.svg" className="beutifooter_icon" />
      </div>
    </section>
  );
};

export default Footer;
