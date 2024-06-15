import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import { toAbsoluteUrl } from "config/Helpers/AbsoluteUrl";
import { DisplayTimeRange } from "config/Helpers/TimeHandlers";
import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import SupportedCitiesModal from "../../atoms/SupportedCitiesModal/SupportedCitiesModal";
import "./InvoiceServices.scss";

export default function InvoiceServices() {
  const [open, setOpen] = useState(false);
  const { bookingData } = useContext(BookingContext);
  const { messages } = useIntl();
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);

  return (
    <>
      {/* visible only on large screens and greater */}
      <Col lg={12} className="invoice d-none d-lg-flex d-xl-flex">
        <Row className="invoice-main">
          <Col xs={12} className="invoice-main_body">
            <Row>
              <Col xs={12} className="invoice-main_body-header">
                <div className="invoice-main_body-header_img">
                  <img
                    height="38"
                    className="w-100 h-100"
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
                <Col xs={12} className="invoice-main_body-summary_title">
                  <FormattedMessage id="invoice.summary" />
                </Col>
                <div className="invoice_services">
                  {bookingData?.bookedServices?.map((service) => (
                    <Col
                      xs={12}
                      className="invoice-main_body-summary_service"
                      key={service?.serviceId}
                    >
                      <div className="invoice-main_body-summary_service-info">
                        <div className="invoice-main_body-summary_service-info_name">
                          {service.name}
                        </div>
                        <div className="invoice-main_body-summary_service-info_details">
                          {DisplayTimeRange(
                            service.minDuration,
                            service.maxDuration,
                            messages
                          )}
                        </div>
                      </div>
                      <div className="invoice-main_body-summary_service-price">
                        {service.price === 0 ? (
                          <FormattedMessage id="common.free" />
                        ) : (
                          <FormattedMessage
                            id={
                              service.isFrom
                                ? "price.label.from"
                                : "price.label.current"
                            }
                            values={{ price: service.price }}
                          />
                        )}
                      </div>
                    </Col>
                  ))}

                  {bookingData?.bookedPackages?.map((service) => (
                    <Col xs={12} className="invoice-main_body-summary_service">
                      <div className="invoice-main_body-summary_service-info">
                        <div className="invoice-main_body-summary_service-info_name">
                          {service.name}
                        </div>
                        <div className="invoice-main_body-summary_service-info_details">
                          {DisplayTimeRange(
                            service.minDuration,
                            service.maxDuration,
                            messages
                          )}{" "}
                        </div>
                      </div>
                      <div className="invoice-main_body-summary_service-price">
                        {service.price === 0 ? (
                          <FormattedMessage id="common.free" />
                        ) : (
                          <FormattedMessage
                            id={
                              service.isFrom
                                ? "price.label.from"
                                : "price.label.current"
                            }
                            values={{ price: service.price }}
                          />
                        )}
                      </div>
                    </Col>
                  ))}
                  {!bookingData?.bookedPackages?.length &&
                    !bookingData?.bookedServices.length && (
                      <Col xs={12} className="text-center my-5 py-5">
                        <FormattedMessage id="invoices.add.service" />
                      </Col>
                    )}
                  {/* show this message if no service added */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="invoice-total">
          <Col xs={12} className="invoice-total_holder">
            <div className="invoice-total_holder-word">
              <FormattedMessage id="common.total" />
            </div>
            <div className="invoice-total_holder-price">
              <FormattedMessage
                id="price.label.current"
                values={{
                  price:
                    !bookingData?.employeeId > 0
                      ? (
                          bookingData?.bookedServices.reduce((prev, next) => {
                            return prev + next?.price || 0;
                          }, 0) +
                          bookingData?.bookedPackages.reduce((prev, next) => {
                            return prev + next?.price || 0;
                          }, 0)
                        ).toFixed(2)
                      : bookingData?.allEmployees?.find(
                          (emp) => +emp?.employeeId === bookingData?.employeeId
                        )?.totalPriceWithVat,
                }}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <SupportedCitiesModal
        setOpen={setOpen}
        open={open}
        list={serviceProviderInfo.supportedCities}
      />
    </>
  );
}
