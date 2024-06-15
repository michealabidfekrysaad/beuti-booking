import { DisplayTimeRange } from "config/Helpers/TimeHandlers";
import { useIntl } from "react-intl";
import "./ServiceNameTime.scss";
const ServiceNameTime = ({ name, min, max }) => {
  const { messages } = useIntl();
  return (
    <section className="servicenametime">
      <div className="servicenametime-name">{name}</div>
      <div className="servicenametime-time">
        {min && max && DisplayTimeRange(min, max, messages)}
      </div>
    </section>
  );
};

export default ServiceNameTime;
