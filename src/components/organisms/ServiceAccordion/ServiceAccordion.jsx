import { Accordion } from "react-bootstrap";

import "./ServiceAccordion.scss";
import PriceOption from "../PriceOption/PriceOption";
import ServiceItem from "../ServiceItem/ServiceItem";
import { useEffect } from "react";

const ServiceAccordion = ({
  service,
  selectedList,
  handleSelectPriceOption,
}) => {
  return (
    <Accordion className="beutiaccordion" defaultActiveKey={false}>
      <Accordion.Item>
        <Accordion.Header>
          <ServiceItem
            hasPriceOption={!!service?.serviceOptions?.length}
            description={service?.description}
            name={service?.name}
            priceOption={service?.serviceOptions}
            serviceisFrom={service?.isFrom}
            servicePrice={service?.minPrice}
            serviceNewPrice={
              service?.isOldPriceRemoved && service?.minPriceAfterDiscount
            }
            serviceDiscount={service?.maximumDiscount}
            serviceHasOffer={service?.hasOffer}
            service={service}
          />
        </Accordion.Header>
        <Accordion.Body>
          {service?.serviceOptions?.map((option) => (
            <PriceOption
              name={option?.name}
              key={option?.id}
              hasOffer={option?.isOffer}
              optionisFrom={option?.isFrom}
              optionPrice={option?.minPrice}
              optionNewPrice={option?.isOffer && option?.priceAfterOffer}
              optionDiscount={option?.isOffer && option?.offerPercentage}
              serviceId={service?.id}
              serviceOptionId={option?.id}
              service={service}
              serviceOption={option}
              handleSelectPriceOption={handleSelectPriceOption}
              selectedList={selectedList}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ServiceAccordion;
