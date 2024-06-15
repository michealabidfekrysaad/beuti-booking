/* eslint-disable */
import React, { useState, useEffect, useContext, useRef } from "react";
import { CallAPI } from "config/APIS/CallAPIS";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { toast } from "react-toastify";

function Payfort() {
  const [merchantToken, setMerchantToken] = useState({});
  const [uniqueKeyToGetCachedObject, setUniqueKeyToGetCachedObject] =
    useState("");
  const { bookingData } = useContext(BookingContext);
  const submitButtonRef = useRef();
  /* -------------------------------------------------------------------------- */
  /*              Cache The Data in Backend  And Catch The Response             */
  /* -------------------------------------------------------------------------- */

  CallAPI({
    name: "CacheDataOnBackend",
    url: "Caching/Set",
    method: "post",
    enabled: !!bookingData?.bookingId && bookingData?.paymentOption === 2,
    body: {
      data: JSON.stringify({
        ...bookingData,
        bookingId: bookingData?.bookingId,
      }),
    },
    onSuccess: (data) => {
      localStorage.setItem("cacheDataOnBackend", data.data.data);
      setUniqueKeyToGetCachedObject(data.data.data);
    },
  });

  /* -------------------------------------------------------------------------- */
  /*         Get The Merchent Token And Catch The Response Then Redirect        */
  /* -------------------------------------------------------------------------- */
  CallAPI({
    name: "merchantTokenRes",
    url: "PayfortIntegration/GenerateMerchantTokenWithReturnUrl",
    method: "post",
    enabled: !!uniqueKeyToGetCachedObject,
    retry: 1,
    body: {
      returnUrl: `${window.location.href}?booking=${uniqueKeyToGetCachedObject}`,
      bookingId: bookingData?.bookingId,
    },
    onSuccess: (data) => {
      setMerchantToken(data.data);
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
  });

  useEffect(() => {
    if (merchantToken?.merchant_identifier) submitButtonRef.current.submit();
  }, [merchantToken]);

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <form
          name="payfort_payment_form"
          id="payfort_payment_form"
          method="post"
          ref={submitButtonRef}
          action={merchantToken.api_url}
        >
          <input
            type="hidden"
            name="access_code"
            value={merchantToken.access_code}
          />
          <input
            hidden
            type="hidden"
            name="language"
            value={merchantToken.language}
          />
          <input
            type="hidden"
            name="merchant_identifier"
            value={merchantToken.merchant_identifier}
          />
          <input
            type="hidden"
            name="merchant_reference"
            value={merchantToken.merchant_reference}
          />
          <input
            hidden
            type="hidden"
            name="return_url"
            value={merchantToken.return_url}
          />

          <input
            type="hidden"
            name="service_command"
            value={merchantToken.service_command}
          />
          <input
            hidden
            type="hidden"
            name="signature"
            value={merchantToken.signature}
          />
        </form>
      </div>
    </div>
  );
}

export default Payfort;
