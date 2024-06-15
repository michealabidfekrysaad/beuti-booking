import { FormattedMessage } from "react-intl";
import "./PriceLabel.scss";
const PriceLabel = ({ price, isFrom, newPrice }) => {
  return (
    <div className="pricelabel">
      {newPrice && (
        <span className="pricelabel_old">
          <FormattedMessage id="price.label.current" values={{ price }} />
        </span>
      )}
      <span className="pricelabel_new">
        <FormattedMessage
          id={isFrom ? "price.label.from" : "price.label.current"}
          values={{ price: newPrice || price }}
        />
      </span>
    </div>
  );
};

export default PriceLabel;
