import Footer from "components/atoms/Footer/Footer";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";
import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Payfort from "../PayFort/Payfort";
import "./FooterServiceInvoice.scss";

export default function FooterServiceInvoice({
  paymentOptions,
  ConfirmBookRefetch,
  noteFieldError,
}) {
  const { bookingData } = useContext(BookingContext);
  const { step, setStep } = useContext(StepperContext);
  const confirmTheBooking = () => {
    // setStep(step + 1);
    ConfirmBookRefetch();
  };
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
    <div className="footer-invoice ">
      <div className="footer-invoice_collapse d-block d-lg-none d-xl-none">
        <Accordion
          defaultActiveKey="1"
          className="footer-invoice_collapse-accordion"
        >
          <Accordion.Item
            eventKey="0"
            className="footer-invoice_collapse-accordion_item"
          >
            <Accordion.Header className="footer-invoice_collapse-accordion_item-header">
              <FormattedMessage id="invoice.summary" />
            </Accordion.Header>
            <Accordion.Body className="footer-invoice_collapse-accordion_item-body">
              {paymentOptions?.services?.map((service) => (
                <Col
                  xs={12}
                  className="footer-invoice_collapse-accordion_item-body-summary"
                  key={service?.serviceOptionId}
                >
                  <div className="footer-invoice_collapse-accordion_item-body-summary_service-info">
                    <div className="footer-invoice_collapse-accordion_item-body-summary_service-info_name">
                      {service?.serviceName}
                    </div>
                    <div className="footer-invoice_collapse-accordion_item-body-summary_service-info_details">
                      {service?.isFromDuration && (
                        <FormattedMessage id="common.from" />
                      )}
                      {returnHoures(service?.duration.split(":")[0]) && (
                        <FormattedMessage
                          id="service.duration.invoice.hr"
                          values={{
                            hour: returnHoures(service?.duration.split(":")[0]),
                          }}
                        />
                      )}{" "}
                      {returnMinutes(service?.duration.split(":")[1]) && (
                        <FormattedMessage
                          id="service.duration.invoice.min"
                          values={{
                            min: returnMinutes(service?.duration.split(":")[1]),
                          }}
                        />
                      )}{" "}
                    </div>
                  </div>
                  <div className="footer-invoice_collapse-accordion_item-body-summary_service-price">
                    <FormattedMessage
                      id="price.label.current"
                      values={{ price: service?.price }}
                    />
                  </div>
                </Col>
              ))}

              {paymentOptions?.packages?.map((service) => (
                <Col
                  xs={12}
                  className="footer-invoice_collapse-accordion_item-body-summary"
                  key={service?.packageId}
                >
                  <div className="footer-invoice_collapse-accordion_item-body-summary_service-info">
                    <div className="footer-invoice_collapse-accordion_item-body-summary_service-info_name">
                      {service?.packageName}
                    </div>
                    {/* <div className="footer-invoice_collapse-accordion_item-body-summary_service-info_details">
                      30 Min | ali emam, Asmaa
                    </div> */}
                  </div>
                  <div className="footer-invoice_collapse-accordion_item-body-summary_service-price">
                    <FormattedMessage
                      id="price.label.current"
                      values={{ price: service?.price }}
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

              {/* {!bookingData?.bookedPackages?.length &&
              !bookingData?.bookedServices.length ? (
                <Col xs={12} className="text-center  pb-5">
                  <FormattedMessage id="invoices.add.service" />
                </Col>
              ) : (
                <Col
                  xs={12}
                  className="footer-invoice_collapse-accordion_item-body_vat"
                >
                  <div className="footer-invoice_collapse-accordion_item-body_vat-section">
                    all prices include vat
                  </div>
                </Col>
              )} */}

              <div className="footer-invoice_collapse-accordion_item-body-summary_dahsed"></div>
              {paymentOptions?.bookingPriceResponse?.map((pay, index) => (
                <Col
                  xs={12}
                  className="footer-invoice_collapse-accordion_item-body-summary"
                  key={pay?.key}
                >
                  <div className="footer-invoice_collapse-accordion_item-body-summary_service-info">
                    <div className="footer-invoice_collapse-accordion_item-body-summary_service-info_name">
                      {pay?.key}
                    </div>
                    {/* <div className="footer-invoice_collapse-accordion_item-body-summary_service-info_details">
                      2 hr
                    </div> */}
                  </div>
                  <div className="footer-invoice_collapse-accordion_item-body-summary_service-price">
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <div className="footer-invoice_payment-type">
          <div>
            You will pay{" "}
            <span className="footer-invoice_payment-type-price">90 SAR</span>{" "}
            from your wallet and{" "}
            <span className="footer-invoice_payment-type-price">50 SAR</span>{" "}
            online to confirm your booking and the remaining 550 will be paid in
            cash
          </div>
        </div> */}
      </div>

      <Footer
        numServices={
          <FormattedMessage
            id="footer.available.services"
            values={{
              num:
                bookingData?.bookedServices?.length +
                bookingData?.bookedPackages?.length,
            }}
          />
        }
        title={<FormattedMessage id="common.total" />}
        numberSubTitle={
          paymentOptions?.bookingPriceResponse?.find(
            (v) =>
              v?.key?.includes("Total") || v?.key?.includes("المجموع الكلي")
          )?.value
        }
        subTitle={<FormattedMessage id="footer.price.with.vat" />}
        textBtn={<FormattedMessage id="common.confirm" />}
        onClick={!noteFieldError && confirmTheBooking}
      />
      <Payfort />
    </div>
  );
}
