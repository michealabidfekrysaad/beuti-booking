import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import React, { useEffect, useState, useContext } from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Col } from "react-bootstrap";
import "./VoucherSection.scss";

export default function VoucherSection({ allVouchers }) {
  const voucherColors = ["default-color", "blue-color", "orange-color"];
  const [styledVouchers, setStyledVouchers] = useState([]);
  const { bookingData, setbookingData } = useContext(BookingContext);

  useEffect(() => {
    const returnClassDependOnIndex = (i) => {
      if (i < 3) return voucherColors[i];
      return voucherColors[Math.floor(Math.random() * voucherColors.length)];
    };
    setStyledVouchers(
      allVouchers?.map((v, index) => ({
        ...v,
        style: returnClassDependOnIndex(index),
        endDate: moment(v?.endDate)?.format("MM/DD"),
      }))
    );
  }, []);

  return (
    <Col xs={12} className="margin">
      <div className="box">
        <div className="box-title">
          <FormattedMessage id="voucher.select" />
        </div>
        <div className="voucher-holder">
          {styledVouchers?.map((vouch) => (
            <button
              key={vouch?.id}
              type="button"
              className={`voucher--btn ${
                vouch?.id === bookingData?.voucherId ? vouch?.style : ""
              }_selected`}
              onClick={() => {
                if (bookingData?.voucherId === vouch?.id) {
                  setbookingData({ ...bookingData, voucherId: null });
                } else {
                  setbookingData({ ...bookingData, voucherId: vouch?.id });
                }
              }}
            >
              <div
                className={`voucher--btn_colored--card--shape ${vouch?.style}`}
              >
                <div className="data">
                  <div className="data-price">
                    <FormattedMessage
                      id="price.label.current"
                      values={{ price: vouch?.value }}
                    />
                  </div>
                  <div className="data-salon--name">
                    {vouch?.serviceProviderName}
                  </div>
                </div>
                <div className="valid">
                  <div className="valid-thru">
                    <div>
                      <FormattedMessage id="voucher.valid" />
                    </div>
                    <div>
                      <FormattedMessage id="voucher.thru" />
                    </div>
                  </div>
                  <div className="valid-date">{vouch?.endDate}</div>
                </div>
                <div className="hr">
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="box-info customize">
          <FormattedMessage id="voucher.hint" />
        </div>
      </div>
    </Col>
  );
}
