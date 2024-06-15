import React, { useState, useEffect } from "react";
import { Col, Row, Modal } from "react-bootstrap";
import "./PricePaymentDetailsModal.scss";
import Toggle from "react-toggle";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import RoundedCheckbox from "components/atoms/RounedCheckbox/RoundedCheckbox";
import { FormattedMessage } from "react-intl";
import ButtonFilled from "components/atoms/Buttons/ButtonFilled";

export default function PricePaymentDetailsModal({
  openPricePaymentDetailsModal,
  setOpenPricePaymentDetailsModal,
  showPriceChanged,
  showPAymentDetails,
  showCouponExpire,
  showSelectPayment,
  showPayAtSalonSection,
  setSelectedPayment,
  selectedPaymnet,
  setWalletCheck,
  walletCheck,
  voucherDataRes,
  callWalletRes,
  confirmBookRes,
  bookScheduleRefetch,
  paymentOptions,
  allPaymentDetails,
  showVoucherExpire,
  ConfirmBookRefetch,
}) {
  const [temproraySelect, setTemproraySelect] = useState(selectedPaymnet);
  const [tempCheckWallet, setTempCheckWallet] = useState(walletCheck);
  useEffect(() => {
    setTemproraySelect(selectedPaymnet);
  }, [selectedPaymnet]);

  useEffect(() => {
    setTempCheckWallet(walletCheck);
  }, [walletCheck]);

  return (
    <Modal
      show={openPricePaymentDetailsModal}
      onHide={() => setOpenPricePaymentDetailsModal(false)}
      className="beuti-modal price__payment"
    >
      <Modal.Header
        className="beuti-modal_header mb-2"
        closeButton
      ></Modal.Header>
      <Modal.Body className="beuti-modal_body">
        {showPriceChanged && (
          <>
            <div className="beuti-modal_header-title text-center">
              <FormattedMessage id="price.payment.price.changed" />
            </div>
            <div className="beuti-modal_header-sub-title text-center">
              <FormattedMessage id="price.payment.price.changed.hint" />
            </div>
            {/* show services change price */}
            {confirmBookRes?.updatedItems?.updatedServiceOption?.serviceOptions?.map(
              (ser) => (
                <Col
                  xs={12}
                  className="beuti-modal_body-data mb-3"
                  key={ser?.serviceOptionId}
                >
                  <div className="beuti-modal_body-data_service ">
                    {ser?.name}
                  </div>
                  <div className="beuti-modal_body-data_prices">
                    <div className="beuti-modal_body-data_prices-before_price">
                      <FormattedMessage
                        id="price.payment.price.before"
                        values={{
                          price: ser?.oldPrice,
                        }}
                      />
                    </div>
                    <div className="beuti-modal_body-data_prices-after_price">
                      <FormattedMessage
                        id="price.payment.price.after"
                        values={{
                          price: ser?.newPrice,
                        }}
                      />
                    </div>
                  </div>
                </Col>
              )
            )}
            {/* show packages change price */}
            {confirmBookRes?.updatedItems?.updatedPackages?.updatedPackagePrice?.map(
              (pack) => (
                <Col
                  xs={12}
                  className="beuti-modal_body-data mb-3"
                  key={pack?.packageID}
                >
                  <div className="beuti-modal_body-data_service ">
                    {pack?.packageName}
                  </div>
                  <div className="beuti-modal_body-data_prices">
                    <div className="beuti-modal_body-data_prices-before_price">
                      <FormattedMessage
                        id="price.payment.price.before"
                        values={{
                          price: pack?.oldPrice,
                        }}
                      />
                    </div>
                    <div className="beuti-modal_body-data_prices-after_price">
                      <FormattedMessage
                        id="price.payment.price.after"
                        values={{
                          price: pack?.newPrice,
                        }}
                      />
                    </div>
                  </div>
                </Col>
              )
            )}
            {confirmBookRes?.updatedItems?.updatedCityFees?.cityName && (
              <Col xs={12} className="beuti-modal_body-data mb-3">
                <div className="beuti-modal_body-data_service ">
                  {confirmBookRes?.updatedItems?.updatedCityFees?.cityName}
                </div>
                <div className="beuti-modal_body-data_prices">
                  <div className="beuti-modal_body-data_prices-before_price">
                    <FormattedMessage
                      id="price.payment.price.before"
                      values={{
                        price:
                          confirmBookRes?.updatedItems?.updatedCityFees
                            ?.oldPrice,
                      }}
                    />
                  </div>
                  <div className="beuti-modal_body-data_prices-after_price">
                    <FormattedMessage
                      id="price.payment.price.after"
                      values={{
                        price:
                          confirmBookRes?.updatedItems?.updatedCityFees
                            ?.newPrice,
                      }}
                    />
                  </div>
                </div>
              </Col>
            )}
            <hr className="w-100 seperator-hr my-4" />
          </>
        )}

        {/* payment details section */}
        <Modal.Header className="beuti-modal_header">
          <div className="beuti-modal_header-title text-center mb-3">
            <FormattedMessage id="price.payment.payment.details" />
          </div>
        </Modal.Header>
        {!showCouponExpire && (
          <div className="alert-coupon">
            {confirmBookRes?.updatedItems?.couponExpiredNote}
          </div>
        )}
        {!showVoucherExpire && (
          <div className="alert-coupon">
            {confirmBookRes?.updatedItems?.voucherExpiredNote}
          </div>
        )}
        <div className="beuti-modal_body-total">
          <div className="beuti-modal_body-total_label">
            <FormattedMessage id="common.total" />
          </div>
          {/* show the total price of booking */}
          <div className="beuti-modal_body-total_price">
            <FormattedMessage
              id="price.label.current"
              values={{
                price:
                  confirmBookRes?.updatedTotalPrice > 0
                    ? confirmBookRes?.updatedTotalPrice
                    : paymentOptions?.bookingPriceResponse?.find(
                        (v) =>
                          v?.key?.includes("Total") ||
                          v?.key?.includes("المجموع الكلي")
                      )?.value,
              }}
            />
          </div>
        </div>

        {/* online payment section appear when has wallet balance or has methodname online */}
        {showPAymentDetails && (
          <div className="beuti-modal_body-online">
            <div className="beuti-modal_body-online_title">
              <FormattedMessage id="price.payment.price.online.pay" />
            </div>
            <div className="beuti-modal_body-online_sub--title">
              <FormattedMessage id="price.payment.price.online.pay.hint" />
            </div>
            <Row className="beuti-modal_body-online_data">
              {/* show the wallet money and image */}
              {/* put the section  in the middle if no online payment choosen */}
              {confirmBookRes?.onlinePaymentDetails?.onlinePayment
                ?.walletValue > 0 && (
                <Col
                  xs={`${
                    confirmBookRes?.onlinePaymentDetails?.onlinePayment
                      ?.onlineValue > 0
                      ? "6"
                      : "12"
                  }`}
                  className={`beuti-modal_body-online_data-holder ${
                    !confirmBookRes?.onlinePaymentDetails?.onlinePayment
                      ?.onlineValue > 0 && "justify-content-center"
                  }`}
                >
                  <div className="beuti-modal_body-online_data-holder_img">
                    <SvgIcon src="/Icons/purpleWallet.svg" />
                  </div>
                  <div className="beuti-modal_body-online_data-holder_info">
                    <span className="beuti-modal_body-online_data-holder_info-name">
                      <FormattedMessage id="wallet.balance" />
                    </span>
                    <span className="beuti-modal_body-online_data-holder_info-price">
                      <FormattedMessage
                        id="price.label.current"
                        values={{
                          price:
                            confirmBookRes?.onlinePaymentDetails?.onlinePayment
                              ?.walletValue,
                        }}
                      />
                    </span>
                  </div>
                </Col>
              )}
              {/* show  this section if has payment name from BE */}
              {/* make the section in the middle if no wallet appear above */}
              {confirmBookRes?.onlinePaymentDetails?.onlinePayment
                ?.onlineMethodName && (
                <Col
                  xs={`${
                    confirmBookRes?.onlinePaymentDetails?.onlinePayment
                      ?.walletValue > 0
                      ? "6"
                      : "12"
                  }`}
                  className={`beuti-modal_body-online_data-holder ${
                    !confirmBookRes?.onlinePaymentDetails?.onlinePayment
                      ?.walletValue > 0 && "justify-content-center"
                  }`}
                >
                  <div className="beuti-modal_body-online_data-holder_img">
                    <img
                      alt="img"
                      src={
                        allPaymentDetails?.find(
                          (p) =>
                            p?.paymentMethodId ===
                            confirmBookRes?.onlinePaymentDetails?.onlinePayment
                              ?.onlineMethodId
                        )?.image
                      }
                    />
                  </div>
                  <div className="beuti-modal_body-online_data-holder_info">
                    <span className="beuti-modal_body-online_data-holder_info-name">
                      {
                        confirmBookRes?.onlinePaymentDetails?.onlinePayment
                          ?.onlineMethodName
                      }
                    </span>
                    <span className="beuti-modal_body-online_data-holder_info-price">
                      <FormattedMessage
                        id="price.label.current"
                        values={{
                          price:
                            confirmBookRes?.onlinePaymentDetails?.onlinePayment
                              ?.onlineValue,
                        }}
                      />
                    </span>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        )}

        {!showSelectPayment && (
          <>
            {/* select  another payment method */}
            <div className="beuti-modal_body-online">
              <div className="beuti-modal_body-online_title">
                <FormattedMessage id="price.payment.price.online.pay" />
              </div>
              <div className="beuti-modal_body-online_sub--title">
                <FormattedMessage id="price.payment.price.change.payment" />
                {/* need to pass the payment name for message */}
              </div>
              {confirmBookRes?.onlinePaymentDetails?.onlinePayment
                ?.walletValue > 0 && (
                <div className="box-data">
                  <div className="box-data_first">
                    <SvgIcon src="/Icons/wallet.svg" />
                    <div className="box-data_first-wallet">
                      <FormattedMessage id="wallet.balance" />
                    </div>
                    <div className="box-data_first-balance">
                      <FormattedMessage
                        id="price.label.current"
                        values={{
                          price:
                            confirmBookRes?.onlinePaymentDetails?.onlinePayment
                              ?.walletValue,
                        }}
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
              {confirmBookRes?.onlinePaymentDetails?.onlinePayment?.paymentModel?.paymentOptions
                ?.filter((pay) => pay?.paymentMethodId !== 3)
                ?.filter((pay) => pay?.isEnabled)
                ?.map((pay) => (
                  <div
                    className={`${
                      pay?.isEnabled ? `holder` : `holder disable--label`
                    }`}
                    key={pay?.paymentMethodId}
                  >
                    <div>
                      <RoundedCheckbox
                        label={pay?.name}
                        labelClass={`${
                          pay?.isEnabled
                            ? `holder-label`
                            : `holder-label--disabled`
                        }`}
                        value={pay?.paymentMethodId}
                        checked={pay?.paymentMethodId === selectedPaymnet}
                        onChange={(e) => {
                          setSelectedPayment(+e?.target?.value);
                          setTimeout(() => {
                            ConfirmBookRefetch();
                          }, 500);
                        }}
                        name={pay?.name}
                        disabled={!pay?.isEnabled}
                      />
                    </div>
                    <div className="holder-logo">
                      <img
                        alt="pay"
                        src={
                          allPaymentDetails?.find(
                            (p) => p?.paymentMethodId === pay?.paymentMethodId
                          )?.image
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* rest at salon section */}
        {showPayAtSalonSection && (
          <div className="beuti-modal_body-online">
            <div className="beuti-modal_body-online_title">
              <FormattedMessage id="price.payment.price.rest.salon" />
            </div>
            <div className="beuti-modal_body-online_sub--title">
              <FormattedMessage id="price.payment.price.rest.salon.hint" />
            </div>
            <Row className="beuti-modal_body-online_data">
              <Col
                xs={12}
                className="beuti-modal_body-online_data-holder justify-content-center"
              >
                <div className="beuti-modal_body-online_data-holder_img">
                  <SvgIcon src="/Icons/chair.svg" />
                </div>
                <div className="beuti-modal_body-online_data-holder_info">
                  <span className="beuti-modal_body-online_data-holder_info-name">
                    <FormattedMessage id="common.salon" />
                  </span>
                  <span className="beuti-modal_body-online_data-holder_info-price">
                    <FormattedMessage
                      id="price.label.current"
                      values={{
                        price:
                          confirmBookRes?.onlinePaymentDetails?.salonPayment
                            ?.salonValue,
                      }}
                    />
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        )}
        {/* booking cancelation policy */}
        {confirmBookRes?.onlinePaymentDetails?.cancellationData?.canCancel && (
          <div className="beuti-modal_body-online">
            <div className="beuti-modal_body-online_title d-flex align-items-center">
              <SvgIcon className="pb-2" src="/Icons/alert.svg" />
              <span className="mx-2">
                <FormattedMessage id="price.payment.price.book.cancel.policy" />
              </span>
            </div>
            <div className="beuti-modal_body-online_sub--title">
              {
                confirmBookRes?.onlinePaymentDetails?.cancellationData
                  ?.cancelationMessage
              }
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="beuti-modal_footer-one-btn">
        {confirmBookRes?.onlinePaymentDetails?.onlinePayment?.onlineValue >
        0 ? (
          <button
            className="beuti-btn primary-btn btn-md special--btn"
            onClick={() => {
              setSelectedPayment(temproraySelect);
              setWalletCheck(tempCheckWallet);
              setOpenPricePaymentDetailsModal(false);
              bookScheduleRefetch();
            }}
          >
            <div>
              <FormattedMessage id="common.pay" />
            </div>
            <div>
              <FormattedMessage
                id="price.label.current"
                values={{
                  price:
                    confirmBookRes?.onlinePaymentDetails?.onlinePayment
                      ?.onlineValue,
                  //   ||
                  // confirmBookRes?.onlinePaymentDetails?.onlinePayment
                  //   ?.paymentModel?.onlineValue,
                }}
              />
            </div>
          </button>
        ) : (
          <ButtonFilled
            className="w-100"
            size="btn-md"
            onClick={() => {
              setSelectedPayment(temproraySelect);
              setWalletCheck(tempCheckWallet);
              setOpenPricePaymentDetailsModal(false);
              bookScheduleRefetch();
            }}
            text={<FormattedMessage id="price.payment.btn.book" />}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
}
