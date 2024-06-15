import React from "react";
import { Row } from "react-bootstrap";
import "./CheckoutTemp.scss";
import { useIntl } from "react-intl";
import VoucherSection from "../../organisms/CheckoutSections/VoucherSection/VoucherSection";
import CouponSection from "../../organisms/CheckoutSections/CouponSection/CouponSection";
import PaymentSection from "../../organisms/CheckoutSections/PaymentSection/PaymentSection";
import NoteSection from "../../organisms/CheckoutSections/NoteSection/NoteSection";
import CancelationSection from "../../organisms/CheckoutSections/CancelationSection/CancelationSection";
import RedirectPaymentScreen from "../../organisms/CheckoutSections/RedirectPaymentScreen/RedirectPaymentScreen";
import BookingStatus from "components/organisms/CheckoutSections/BookingStatus/BookingStatus";
import FooterServiceInvoice from "components/organisms/FooterServiceInvoice/FooterServiceInvoice";
import TimeItemUnavailable from "components/organisms/CheckoutSections/TimeItemUnavailable/TimeItemUnavailable";
import PricePaymentDetailsModal from "components/organisms/CheckoutSections/PricePaymentDetailsModal/PricePaymentDetailsModal";
import UserDataSection from "components/organisms/CheckoutSections/UserDataSection/UserDataSection";
import InvoiceServicesCheckout from "components/organisms/InvoiceServicesCheckout/InvoiceServicesCheckout";
import { steps } from "config/Contexts/StepperContext/StepperContext";

export default function CheckoutTemp({
  setWalletCheck,
  walletCheck,
  setOpenchangePayment,
  openChnagePayment,
  selectedPaymnet,
  allPaymentDetails,
  setSelectedPayment,
  openRedirectModal,
  setOpenRedirectModal,
  setNote,
  note,
  setOpenPricePaymentDetailsModal,
  openPricePaymentDetailsModal,
  voucherDataRes,
  voucherFetching,
  callWalletRes,
  enteredCoupon,
  setEnteredCoupon,
  couponFetching,
  couponRefetch,
  walletEnableRes,
  paymentOptions,
  ConfirmBookRefetch,
  confirmBookRes,
  bookScheduleRefetch,
  paymentOptionsFetching,
  setOpenUnavailable,
  openUnavailable,
  noteFieldError,
}) {
  const { messages, locale } = useIntl();
  return (
    <Row className="position-relative" style={{ marginBottom: "150px" }}>
      {!voucherFetching ? (
        <>
          <UserDataSection
            spName={voucherDataRes?.spName}
            spAddress={voucherDataRes?.spAddress}
          />

          {voucherDataRes?.customerData?.vouchers?.length > 0 && (
            <VoucherSection
              allVouchers={voucherDataRes?.customerData?.vouchers}
            />
          )}

          <CouponSection
            setEnteredCoupon={setEnteredCoupon}
            enteredCoupon={enteredCoupon}
            couponFetching={couponFetching}
            couponRefetch={couponRefetch}
          />

          <PaymentSection
            setWalletCheck={setWalletCheck}
            walletCheck={walletCheck}
            setOpenchangePayment={setOpenchangePayment}
            openChnagePayment={openChnagePayment}
            setSelectedPayment={setSelectedPayment}
            selectedPaymnet={selectedPaymnet}
            allPaymentDetails={allPaymentDetails}
            voucherDataRes={voucherDataRes}
            callWalletRes={callWalletRes}
            walletEnableRes={walletEnableRes}
          />

          <NoteSection
            setNote={setNote}
            note={note}
            noteFieldError={noteFieldError}
          />

          {voucherDataRes?.cancelationData?.canCancel && (
            <CancelationSection
              cancelationMessage={
                voucherDataRes?.cancelationData?.cancelationMessage
              }
            />
          )}

          <RedirectPaymentScreen
            setOpenRedirectModal={setOpenRedirectModal}
            openRedirectModal={openRedirectModal}
          />

          {/* <BookingStatus /> */}
          {/* render this component at StepsWrapper */}

          {/* appear only on screen smaller than large */}
          {/* <FooterServiceInvoice /> */}

          <TimeItemUnavailable
            setOpenUnavailable={setOpenUnavailable}
            openUnavailable={openUnavailable}
            img={
              confirmBookRes?.updatedItems?.messageType === 2
                ? "/Icons/noItem.svg"
                : "/Icons/closedDay.svg"
            }
            btnText={
              confirmBookRes?.updatedItems?.messageType === 2
                ? "service.not.available"
                : "time.not.available"
            }
            title={
              confirmBookRes?.updatedItems?.messageType === 2
                ? "service.not.available.title"
                : "time.not.available.title"
            }
            subTitle={
              confirmBookRes?.updatedItems?.messageType === 2
                ? "service.not.available.sub.title"
                : "time.not.available.sub.title"
            }
            goStep={
              confirmBookRes?.updatedItems?.messageType === 2
                ? steps?.services
                : steps?.time
            }
          />

          <PricePaymentDetailsModal
            openPricePaymentDetailsModal={openPricePaymentDetailsModal}
            setOpenPricePaymentDetailsModal={setOpenPricePaymentDetailsModal}
            selectedPaymnet={selectedPaymnet}
            setWalletCheck={setWalletCheck}
            walletCheck={walletCheck}
            setSelectedPayment={setSelectedPayment}
            voucherDataRes={voucherDataRes}
            callWalletRes={callWalletRes}
            showPriceChanged={confirmBookRes?.isPriceChanged}
            showPAymentDetails={
              confirmBookRes?.onlinePaymentDetails?.onlinePayment
                ?.isSectionDisplayValid &&
              (confirmBookRes?.onlinePaymentDetails?.onlinePayment
                ?.onlineMethodName ||
                confirmBookRes?.onlinePaymentDetails?.onlinePayment
                  ?.walletValue > 0)
            }
            showPayAtSalonSection={
              confirmBookRes?.onlinePaymentDetails?.salonPayment
                ?.isSectionDisplayValid
            }
            showSelectPayment={
              confirmBookRes?.onlinePaymentDetails?.onlinePayment
                ?.isOptionsValid
            }
            showCouponExpire={confirmBookRes?.updatedItems?.isCouponValid}
            showVoucherExpire={confirmBookRes?.updatedItems?.isVoucherValid}
            confirmBookRes={confirmBookRes}
            bookScheduleRefetch={bookScheduleRefetch}
            paymentOptions={paymentOptions}
            allPaymentDetails={allPaymentDetails}
            ConfirmBookRefetch={ConfirmBookRefetch}
          />

          <InvoiceServicesCheckout
            paymentOptions={paymentOptions}
            paymentOptionsFetching={paymentOptionsFetching}
          />

          <FooterServiceInvoice
            paymentOptions={paymentOptions}
            ConfirmBookRefetch={ConfirmBookRefetch}
            noteFieldError={noteFieldError}
          />
        </>
      ) : (
        <div className="loading"></div>
      )}
    </Row>
  );
}
