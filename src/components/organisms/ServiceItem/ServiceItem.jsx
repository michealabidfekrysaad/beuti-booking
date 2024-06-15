import DayTimeCounter from "components/molecules/DayTimeCounter/DayTimeCounter";
import { convertTimeToMinuts } from "config/Helpers/TimeHandlers";
import { Col, Row } from "react-bootstrap";
import SvgIcon from "../../atoms/Icons/SvgIcon";
import PriceLabel from "../../atoms/PriceLabel/PriceLabel";
import RoundedCheckbox from "../../atoms/RounedCheckbox/RoundedCheckbox";
import RemaningDays from "../../molecules/RemaningDays/RemaningDays";
import SaveLabel from "../../molecules/SaveLabel/SaveLabel";
import ServiceNameTime from "../../molecules/ServiceNameTime/ServiceNameTime";

import "./ServiceItem.scss";
const ServiceItem = ({
  hasPriceOption,
  description,
  name,
  days,
  serviceisFrom,
  servicePrice,
  serviceNewPrice,
  serviceDiscount,
  serviceHasOffer,
  handleSelectService,
  service,
  serviceId,
  selectedList,
  services,
}) => {
  return (
    <label
      htmlFor={name + serviceId}
      className={`${!hasPriceOption && "serviceitem-wrapper"} w-100`}
    >
      <Row className="serviceitem">
        <Col xs="6">
          <div className="serviceitem-title">
            {hasPriceOption ? (
              <span className="serviceitem-title_arrow">
                <SvgIcon src="/Icons/accordionArrow.svg" />
              </span>
            ) : (
              <RoundedCheckbox
                onChange={(e) => {
                  handleSelectService(service);
                }}
                name={name + serviceId}
                value={serviceId}
                checked={
                  !!selectedList?.find(
                    (selectedService) =>
                      +selectedService?.serviceId === +serviceId ||
                      +selectedService?.packageId === +serviceId
                  )
                }
              />
            )}
            <div className="serviceitem-title_name">
              <ServiceNameTime
                name={name}
                min={convertTimeToMinuts(service?.minDuration)}
                max={convertTimeToMinuts(service?.maxDuration)}
              />
            </div>
          </div>
        </Col>
        <Col xs="auto">
          <PriceLabel
            isFrom={serviceisFrom}
            price={servicePrice}
            newPrice={serviceNewPrice}
          />
        </Col>
        {description && (
          <Col xs="12" className="serviceitem-description">
            {description}
          </Col>
        )}
        {serviceHasOffer && (
          <Col xs="12" className="serviceitem-offertime">
            <Row className="justify-content-between">
              <Col xs="auto">
                <SaveLabel
                  className="mb-2"
                  upTo={!!hasPriceOption}
                  discount={serviceDiscount}
                />
              </Col>
              <Col xs="auto">
                {service.minOfferDate && (
                  <DayTimeCounter
                    className="mb-2"
                    offerDate={service.minOfferDate}
                  />
                )}
              </Col>
            </Row>
          </Col>
        )}
        <div className="serviceitem-package">
          {services?.map((serv, i) => (
            <div key={serv.id || i} className="serviceitem-package__item">
              {serv.count > 1 && (
                <>
                  {serv.count}x
                  <span className="serviceitem-package__item-dash"> | </span>
                </>
              )}
              {serv.name}
            </div>
          ))}
        </div>
      </Row>
    </label>
  );
};

export default ServiceItem;
