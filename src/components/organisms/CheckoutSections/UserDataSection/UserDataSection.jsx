import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import moment from "moment";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import React, { useContext } from "react";
import { toAbsoluteUrl } from "config/Helpers/AbsoluteUrl";
import { Row, Col } from "react-bootstrap";
import "./UserDataSection.scss";
import { returnTotalTimeForBooking } from "config/Helpers/TimeHandlers";
import { useIntl } from "react-intl";

export default function UserDataSection({ spName, spAddress }) {
  const { bookingData } = useContext(BookingContext);
  const { messages } = useIntl();
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);

  return (
    <Row className="d-flex  d-lg-none d-xl-none margin justify-content-between">
      <Col lg={6} md={6} sm={12} className="invoice-main_body-header py-2">
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
            {spName}
            <img
              className="mx-2"
              width="17"
              height="17"
              src="/Icons/chek-mark.png"
              alt="check"
            />
          </div>
          <div className="invoice-main_body-header_details-address">
            {spAddress}
          </div>
        </div>{" "}
      </Col>
      <Col lg={4} md={4} sm={12} className="py-2 data">
        <div className="data-date">
          <p>{moment(bookingData?.PickerBookingDate).format("DD MMM YYYY")}</p>{" "}
          <p>{messages["common.at"]}</p> <p>{bookingData?.bookingDateTime}</p>
        </div>
        <div className="data-duration">
          {returnTotalTimeForBooking(bookingData, messages)}{" "}
          {messages["common.duration"]}
        </div>
      </Col>
    </Row>
  );
}
