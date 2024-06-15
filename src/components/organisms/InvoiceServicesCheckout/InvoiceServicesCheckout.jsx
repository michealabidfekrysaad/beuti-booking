import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import { toAbsoluteUrl } from "config/Helpers/AbsoluteUrl";
import moment from "moment";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import SupportedCitiesModal from "../../atoms/SupportedCitiesModal/SupportedCitiesModal";
import "./InvoiceServicesCheckout.scss";

export default function InvoiceServicesCheckout({ paymentOptions }) {
  const { locale } = useIntl();
  const [open, setOpen] = useState(false);
  const { bookingData } = useContext(BookingContext);
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);
  const returnHoures = (hours) => {
    if (hours) {
      if (+hours.charAt(0) === +0) {
        if (+hours.charAt(1) === +0) return null;
        return hours.charAt(hours?.length - 1);
      }
      return hours;
    }
    return null;
  };

  const returnMinutes = (minutes) => {
    if (minutes) {
      if (+minutes.charAt(0) === +0) {
        if (+minutes.charAt(1) === +0) return null;
        return minutes.charAt(minutes?.length - 1);
      }
      return minutes;
    }
    return null;
  };

  return (
    <>
      {/* visible only on large screens and greater */}
      <div className="checkout">
        <Col lg={12} className="invoice d-none d-lg-flex d-xl-flex">
          <Row className="invoice-main">
            <Col xs={12} className="invoice-main_body">
              <Row>
                <Col xs={12} className="invoice-main_body-header">
                  <div className="invoice-main_body-header_img">
                    <img
                      height="38"
                      src={
                        serviceProviderInfo?.imageUrl ||
                        toAbsoluteUrl("/Images/branch.png")
                      }
                      alt="salon"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/Images/branch.png";
                      }}
                    />
                  </div>
                  <div className="invoice-main_body-header_details">
                    <div className="invoice-main_body-header_details-title">
                      {serviceProviderInfo?.name}
                      <img
                        className="mx-2"
                        width="17"
                        height="17"
                        src="/Icons/chek-mark.png"
                        alt="check"
                      />
                    </div>
                    <div className="invoice-main_body-header_details-address">
                      {serviceProviderInfo?.address}{" "}
                    </div>
                    <div className="invoice-main_body-header_details-city">
                      <button onClick={() => setOpen(true)}>
                        <FormattedMessage id="invoice.supported.cities" />
                      </button>
                    </div>
                  </div>
                </Col>
                <Col xs={12} className="invoice-main_body-summary">
                  <div className="invoice-main_body-summary_dahsed"></div>
                  <Col
                    xs={12}
                    className="invoice-main_body-summary_title d-flex"
                  >
                    <div className="data-date">
                      <p>
                        {moment(bookingData?.PickerBookingDate)
                          .locale(locale)
                          .format("DD MMM YYYY")}
                      </p>{" "}
                      <p>
                        <FormattedMessage id="common.at" />
                      </p>{" "}
                      <p>{bookingData?.bookingDateTime}</p>
                    </div>
                  </Col>
                  <div className="invoice-main_body-summary_dahsed"></div>
                  <Col xs={12} className="invoice-main_body-summary_title">
                    <FormattedMessage id="invoice.summary" />
                  </Col>
                  <div className="invoice_services">
                    {paymentOptions?.services?.map((service) => (
                      <Col
                        xs={12}
                        className="invoice-main_body-summary_service"
                        key={service?.serviceOptionId}
                      >
                        <div className="invoice-main_body-summary_service-info">
                          <div className="invoice-main_body-summary_service-info_name">
                            {service.serviceName}
                          </div>
                          <div className="invoice-main_body-summary_service-info_details">
                            {service?.isFromDuration && (
                              <FormattedMessage id="common.from" />
                            )}
                            {returnHoures(service?.duration.split(":")[0]) && (
                              <FormattedMessage
                                id="service.duration.invoice.hr"
                                values={{
                                  hour: returnHoures(
                                    service?.duration.split(":")[0]
                                  ),
                                }}
                              />
                            )}{" "}
                            {returnMinutes(service?.duration.split(":")[1]) && (
                              <FormattedMessage
                                id="service.duration.invoice.min"
                                values={{
                                  min: returnMinutes(
                                    service?.duration.split(":")[1]
                                  ),
                                }}
                              />
                            )}{" "}
                          </div>
                        </div>
                        <div className="invoice-main_body-summary_service-price">
                          <FormattedMessage
                            id={`price.label.${
                              !service?.isFromPrice ? "current" : "from"
                            }`}
                            values={{ price: service.price }}
                          />
                          {service.price !== service.priceBeforeDiscount && (
                            <div className="invoice-main_body-summary_service-price_old">
                              <FormattedMessage
                                id="price.label.current"
                                values={{ price: service.priceBeforeDiscount }}
                              />
                            </div>
                          )}
                        </div>
                      </Col>
                    ))}

                    {paymentOptions?.packages?.map((service) => (
                      <Col
                        xs={12}
                        className="invoice-main_body-summary_service"
                        key={service?.packageId}
                      >
                        <div className="invoice-main_body-summary_service-info">
                          <div className="invoice-main_body-summary_service-info_name">
                            {service.packageName}
                          </div>
                          {/* <div className="invoice-main_body-summary_service-info_details">
                          30 Min | micheal, Asmaa
                        </div> */}
                        </div>
                        <div className="invoice-main_body-summary_service-price">
                          <FormattedMessage
                            id="price.label.current"
                            values={{ price: service.price }}
                          />
                          {service.price !== service.priceBefore && (
                            <div className="invoice-main_body-summary_service-price_old">
                              <FormattedMessage
                                id="price.label.current"
                                values={{ price: service.priceBefore }}
                              />
                            </div>
                          )}
                        </div>
                      </Col>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="invoice-total">
            <div className="scroll">
              {paymentOptions?.bookingPriceResponse?.map((pay, index) => (
                <Col xs={12} className="invoice-total_holder" key={pay?.key}>
                  <div
                    className={`invoice-total_holder-word ${
                      paymentOptions?.bookingPriceResponse?.length - 1 ===
                        index && "fw-bold"
                    }`}
                  >
                    {pay?.key}
                  </div>
                  <div
                    className={`invoice-total_holder-price ${
                      paymentOptions?.bookingPriceResponse?.length - 1 ===
                        index && "fw-bold"
                    }`}
                  >
                    {pay?.amountSign !== 1 && "-"}
                    <FormattedMessage
                      id="price.label.current"
                      values={{
                        price: pay?.value,
                      }}
                    />
                  </div>
                </Col>
              ))}
            </div>
          </Row>
        </Col>
      </div>

      <SupportedCitiesModal
        setOpen={setOpen}
        open={open}
        list={serviceProviderInfo.supportedCities}
      />
    </>
  );
}
