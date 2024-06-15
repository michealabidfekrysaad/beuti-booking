import React, { useContext, useEffect, useRef, useState } from "react";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import PropTypes from "prop-types";
import "./BookingStatus.scss";
import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import { FormattedMessage } from "react-intl";
import RetryPayfort from "components/organisms/PayFort/RetryPayfort";
import { CallAPI } from "config/APIS/CallAPIS";
import { toast } from "react-toastify";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";

export default function BookingStatus({ showScreen, status }) {
  const submitButtonRef = useRef();
  const { bookingData } = useContext(BookingContext);
  const { data } = CallAPI({
    name: "merchantTokenRes",
    url: "PayfortIntegration/GenerateMerchantTokenWithReturnUrl",
    method: "post",
    enabled: !!localStorage.getItem("cacheDataOnBackend"),
    retry: 1,
    body: {
      returnUrl: `${window.location.href}?booking=${localStorage.getItem(
        "cacheDataOnBackend"
      )}`,
      bookingId: localStorage.getItem("bookingId"),
    },
    select: (data) => data.data,
    onError: (err) => toast.error(err?.response?.data?.error?.message),
  });
  return (
    <div className={`over ${showScreen ? "d-flex" : "d-none"}`}>
      <div className="over-data">
        {status === "success" && (
          <>
            <SvgIcon src="/Icons/Check.svg" />
            <div className="over-data_title">
              <FormattedMessage id="book.status.confirm.title" />
            </div>
            <div className="over-data_sub--title">
              <FormattedMessage id="book.status.confirm.sub.title" />
            </div>
          </>
        )}
        {status === "pedning" && (
          <>
            <SvgIcon src="/Icons/pending.svg" />
            <div className="over-data_title">
              <FormattedMessage id="book.status.pedning.title" />
            </div>
            <div className="over-data_sub--title w-50 mx-auto">
              <FormattedMessage id="book.status.pedning.sub.title" />
            </div>
            <div className="over-data_btns--holder">
              <ButtonFilled
                className="over-data_btns--holder-btn"
                text="close page"
              />
              <ButtonFilled
                className="over-data_btns--holder-btn"
                text="make  another booking"
                color="outline-btn"
              />
            </div>
          </>
        )}
        {status === "failed" && (
          <>
            <SvgIcon src="/Icons/failed.svg" />
            <div className="over-data_title">
              <FormattedMessage id="book.status.failed.title" />
            </div>
            <div className="over-data_sub--title w-50 mx-auto">
              <FormattedMessage
                id="book.status.failed.sub.title"
                values={{ price: bookingData?.onlinePayValue }}
              />
            </div>
            <div className="over-data_btns--holder">
              <ButtonFilled
                className="over-data_btns--holder-btn"
                onClick={() => !!data && submitButtonRef.current.submit()}
                text={<FormattedMessage id="book.status.failed.btn" />}
              />
            </div>
            <RetryPayfort
              merchantToken={data}
              submitButtonRef={submitButtonRef}
            />
          </>
        )}
      </div>
    </div>
  );
}

BookingStatus.propTypes = {
  showScreen: PropTypes.bool,
  status: PropTypes.oneOf(["success", "pending", "failed"]),
};

BookingStatus.defaultProps = {
  showScreen: true,
  status: "success",
};
