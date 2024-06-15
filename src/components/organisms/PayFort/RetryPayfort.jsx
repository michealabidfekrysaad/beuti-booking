/* eslint-disable */
import React from "react";

function RetryPayfort({ merchantToken, submitButtonRef }) {
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <form
          name="Retry_payment_form"
          id="payfort_payment_form"
          method="post"
          ref={submitButtonRef}
          action={merchantToken?.api_url}
        >
          <input
            type="hidden"
            name="access_code"
            value={merchantToken?.access_code}
          />
          <input
            hidden
            type="hidden"
            name="language"
            value={merchantToken?.language}
          />
          <input
            type="hidden"
            name="merchant_identifier"
            value={merchantToken?.merchant_identifier}
          />
          <input
            type="hidden"
            name="merchant_reference"
            value={merchantToken?.merchant_reference}
          />
          <input
            hidden
            type="hidden"
            name="return_url"
            value={merchantToken?.return_url}
          />

          <input
            type="hidden"
            name="service_command"
            value={merchantToken?.service_command}
          />
          <input
            hidden
            type="hidden"
            name="signature"
            value={merchantToken?.signature}
          />
        </form>
      </div>
    </div>
  );
}

export default RetryPayfort;
