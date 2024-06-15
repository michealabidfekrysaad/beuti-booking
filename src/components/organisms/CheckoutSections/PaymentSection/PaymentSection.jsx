import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import Toggle from "react-toggle";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useContext } from "react";
import { Col } from "react-bootstrap";
import "./PaymentSection.scss";
import ChangePaymentModal from "./ChangePaymentModal";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";

export default function PaymentSection({
  setWalletCheck,
  walletCheck,
  setOpenchangePayment,
  openChnagePayment,
  setSelectedPayment,
  selectedPaymnet,
  voucherDataRes,
  callWalletRes,
  allPaymentDetails,
  walletEnableRes,
}) {
  const { messages } = useIntl();
  const { bookingData } = useContext(BookingContext);
  return (
    <>
      <Col xs={12} className="margin">
        <div className="box">
          <div className="box-title">
            <div>{messages["payment.method"]}</div>
            <ButtonFilled
              text={messages["payment.change"]}
              className="box-title_btn"
              onClick={() => setOpenchangePayment(true)}
              //   disabled={
              //     bookingData?.walletData?.checked &&
              //     !walletEnableRes?.canUseOnlineIfValid
              //   }
            />
          </div>
          {/* <div className="box-data">
            <div className="box-data_first">
              <SvgIcon src="/Icons/Mastercard.svg" />
              <div className="box-data_first-card--data">
                <div className="d-flex align-items-center">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="mx-2">1111</span>
                </div>
                <div>Exp. 8/2025</div>
              </div>
            </div>
            <div className="box-data_second">
              <Input placeholder="cvv" />
            </div>
          </div> */}
          {allPaymentDetails
            ?.filter(
              (pay) => pay?.paymentMethodId === bookingData?.paymentOption
            )
            ?.map((singlePayment) => (
              <div className="holder" key={singlePayment?.paymentMethodId}>
                <div className="holder-label px-0">{singlePayment?.name}</div>
                <div className="holder-logo">
                  <img alt="pay" src={singlePayment?.image} />
                </div>
              </div>
            ))}
          {voucherDataRes?.customerData?.wallet > 0 && (
            <div className="box-data">
              <div className="box-data_first">
                <SvgIcon src="/Icons/wallet.svg" />
                <div className="box-data_first-wallet">
                  <FormattedMessage id="wallet.balance" />
                </div>
                <div className="box-data_first-balance">
                  <FormattedMessage
                    id="price.label.current"
                    values={{ price: voucherDataRes?.customerData?.wallet }}
                  />
                </div>
              </div>
              <div className="box-data_second">
                <Toggle
                  id="bookingWizard"
                  checked={walletCheck}
                  icons={{
                    unchecked: null,
                  }}
                  onChange={() => {
                    // if (!walletCheck)
                    callWalletRes();
                    setWalletCheck(!walletCheck);
                  }}
                />
              </div>
            </div>
          )}
          {walletCheck && voucherDataRes?.customerData?.wallet > 0 && (
            <div className="box-info">
              {/* <FormattedMessage id="wallet.balnce.after.pay.first" />
              <span className="box-info_price">
                <FormattedMessage
                  id="price.label.current"
                  values={{
                    price: 1000 - voucherDataRes?.customerData?.wallet,
                  }}
                />
              </span>
              <FormattedMessage id="wallet.balnce.after.pay.last" /> */}
              {walletEnableRes?.message}
            </div>
          )}
        </div>
      </Col>
      <ChangePaymentModal
        setOpenchangePayment={setOpenchangePayment}
        openChnagePayment={openChnagePayment}
        selectedPaymnet={selectedPaymnet}
        setSelectedPayment={setSelectedPayment}
        allPaymentDetails={allPaymentDetails}
      />
    </>
  );
}
