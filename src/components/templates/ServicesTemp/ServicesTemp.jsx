import SelectServiceHeader from "components/organisms/SelectServiceHeader/SelectServiceHeader";
import ServiceAccordion from "components/organisms/ServiceAccordion/ServiceAccordion";
import ServiceItem from "components/organisms/ServiceItem/ServiceItem";
import { createRef, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import "./ServicesTemp.scss";
const ServicesTemp = ({
  servicesTabs,
  categories,
  offers,
  packages,
  bookedServices,
  bookedPackages,
  handleSelectService,
  handleSelectPackage,
  handleSelectPriceOption,
  defaultTabsLength,
}) => {
  const [tabs, setTabs] = useState(Array.from("Ref".repeat(30)));
  const { messages } = useIntl();
  const [value, setValue] = useState(0);
  const elementsRef = useRef(tabs.map(() => createRef()));
  const [listenScroll, setListenScroll] = useState(true);
  const handleChange = (event, newValue) => {
    setListenScroll(false);
    window.scrollTo(
      0,
      elementsRef.current[newValue].current.offsetTop -
        (window.screen.width > 500 ? 65 : 85)
    );
    setTimeout(() => {
      setListenScroll(true);
    }, 800);
    setValue(newValue);
  };

  useEffect(() => {
    //   listenScroll: bec, it flickering more than one time
    if (listenScroll) {
      const handleScroll = (event) => {
        setValue(
          elementsRef.current.findIndex((ref, index) => {
            if (
              ref.current &&
              elementsRef.current?.filter((ref) => ref?.current)?.length !==
                index + 1
            ) {
              return (
                ref.current &&
                ref.current.offsetTop - 800 <= window.scrollY &&
                elementsRef.current[index + 1].current.offsetTop - 150 >=
                  window.scrollY
              );
            }
            //   to catch the last tab only before check if it exist and make it active
            if (
              ref.current &&
              elementsRef.current?.filter((ref) => ref?.current)?.length >=
                index + 1
            ) {
              return true;
            }
            return false;
          })
        );
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [listenScroll]);

  useEffect(() => {
    setTabs(servicesTabs);
  }, [servicesTabs]);
  return (
    <>
      <SelectServiceHeader
        categories={tabs}
        handleChange={handleChange}
        value={value}
      />

      <section className="servicestemp">
        {!!offers.length && (
          <h2 className="servicestemp-header mt-3" ref={elementsRef.current[0]}>
            {messages["services.offers"]}{" "}
          </h2>
        )}
        {offers?.map((service) => (
          <Row key={service.id}>
            <Col xs="12" className="mb-2">
              {service?.serviceOptions.length > 1 ? (
                <ServiceAccordion
                  service={service}
                  selectedList={bookedServices}
                  handleSelectPriceOption={handleSelectPriceOption}
                />
              ) : (
                <ServiceItem
                  serviceId={service.id}
                  description={service.description}
                  name={service.name}
                  serviceisFrom={service.isFrom}
                  servicePrice={service?.minPrice}
                  serviceNewPrice={
                    service?.isOldPriceRemoved && service?.minPriceAfterDiscount
                  }
                  service={service}
                  serviceDiscount={service.maximumDiscount}
                  serviceHasOffer={service.hasOffer}
                  handleSelectService={handleSelectService}
                  selectedList={bookedServices}
                />
              )}
            </Col>
          </Row>
        ))}
      </section>
      <section className="mt-3">
        {!!packages.length && (
          <h2
            className="servicestemp-header mt-3"
            ref={elementsRef.current[defaultTabsLength === 2 ? 1 : 0]}
          >
            {messages["services.packages"]}{" "}
          </h2>
        )}
        {packages?.map((pack) => (
          <Row key={pack.id}>
            <Col xs="12" className="mb-2">
              <ServiceItem
                serviceId={pack.id}
                description={pack.description}
                name={pack.name}
                serviceNewPrice={pack.priceAfter}
                servicePrice={pack.priceBefore}
                serviceHasOffer={pack.hasOffer}
                service={pack}
                handleSelectService={handleSelectPackage}
                selectedList={bookedPackages}
                services={pack.services}
              />
            </Col>
          </Row>
        ))}
      </section>
      <section className="mt-3">
        {categories?.map((ele, index) => (
          <div key={index + 2}>
            <h2
              className="servicestemp-header mt-3"
              ref={elementsRef.current[index + defaultTabsLength]}
            >
              {ele.name}
            </h2>

            <Row>
              {ele?.services?.map((service) => (
                <Col xs="12" className="mb-2" key={service.id}>
                  {service?.serviceOptions.length > 1 ? (
                    <ServiceAccordion
                      service={service}
                      selectedList={bookedServices}
                      handleSelectPriceOption={handleSelectPriceOption}
                    />
                  ) : (
                    <ServiceItem
                      serviceId={service.id}
                      description={service.description}
                      name={service.name}
                      serviceisFrom={service.isFrom}
                      servicePrice={service?.minPrice}
                      serviceNewPrice={
                        service?.isOldPriceRemoved &&
                        service?.minPriceAfterDiscount
                      }
                      service={service}
                      serviceDiscount={service.maximumDiscount}
                      serviceHasOffer={service.hasOffer}
                      handleSelectService={handleSelectService}
                      selectedList={bookedServices}
                    />
                  )}
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </section>
    </>
  );
};

export default ServicesTemp;
