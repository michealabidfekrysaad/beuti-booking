/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import CheckoutTemp from "components/templates/CheckoutTemp/CheckoutTemp";
import { CallAPI } from "config/APIS/CallAPIS";
import { toast } from "react-toastify";
import {
  bookSchedule,
  confirmBooking,
  enableWalletOption,
  getCustomerBookingData,
  getValidateCoupon,
  priceOptionsBookSummary,
} from "config/APIS/EndPoints/EndPoints";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import moment from "moment";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { useIntl } from "react-intl";
export default function CheckoutPage() {
  const { locale, messages } = useIntl();
  const { bookingData, setbookingData } = useContext(BookingContext);
  const { setStep, step, handleStepper } = useContext(StepperContext);
  const [walletCheck, setWalletCheck] = useState(true);
  const [openChnagePayment, setOpenchangePayment] = useState(false);
  const [selectedPaymnet, setSelectedPayment] = useState(1);
  const [openRedirectModal, setOpenRedirectModal] = useState(false);
  const [openUnavailable, setOpenUnavailable] = useState(false);
  const [note, setNote] = useState("");
  const [enteredCoupon, setEnteredCoupon] = useState(
    bookingData?.promoReferralCode?.code || ""
  );
  const [allPaymentDetails, setAllPaymentDetails] = useState([]);
  const [openPricePaymentDetailsModal, setOpenPricePaymentDetailsModal] =
    useState(false);
  const [noteFieldError, setNoteFieldError] = useState(false);
  const [canUseOnline, setCanUseOnline] = useState(false);
  const putImageForPaymentType = (paymentMethodId) => {
    if (paymentMethodId === 1) return "/Icons/cash.svg";
    if (paymentMethodId === 2) return "/Icons/mada.svg";
    if (paymentMethodId === 3) return "/Icons/PayPal.svg";
  };
  /* -------------------------------------------------------------------------- */
  /*                 get voucher and cancellationTime and spData                */
  /* -------------------------------------------------------------------------- */
  const {
    data: voucherDataRes,
    isFetching: voucherFetching,
    refetch: callVoucherRefetch,
  } = CallAPI({
    name: ["getVoucherCancelltime", bookingData?.walletData?.checked],
    url: getCustomerBookingData,
    enabled: true,
    query: {
      spId: +bookingData?.serviceProviderId,
      bookingDateTime:
        moment(bookingData?.PickerBookingDate).format("YYYY-MM-DD") +
        "T" +
        bookingData?.bookingDateTime,
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });
  /* -------------------------------------------------------------------------- */
  /*                          get coupon and percentage                         */
  /* -------------------------------------------------------------------------- */
  const {
    data: validateCouponRes,
    isFetching: couponFetching,
    refetch: couponRefetch,
  } = CallAPI({
    name: "getCouponValidateAndPercentage",
    url: getValidateCoupon,
    retry: 1,
    enabled: false,
    query: {
      code: enteredCoupon,
      bookingDate: moment(bookingData?.PickerBookingDate).format("YYYY-MM-DD"),
      serviceProviderId: +bookingData?.serviceProviderId,
    },
    onSuccess: (res) => {
      if (res?.isValid) {
        toast.success(messages["coupon.added.successfully"]);
        setbookingData({
          ...bookingData,
          promoReferralCode: {
            code: res?.code,
            percentage: res?.percentage,
            promoCodeId: res?.promoCodeId,
          },
        });
      } else {
        setbookingData({
          ...bookingData,
          promoReferralCode: null,
        });
        setEnteredCoupon("");
        toast.error(res?.message);
      }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });
  /* -------------------------------------------------------------------------- */
  /*                   get options and summary and paymentType                  */
  /* -------------------------------------------------------------------------- */
  const {
    data: paymentOptions,
    isFetching: paymentOptionsFetching,
    refetch: recallPayment,
  } = CallAPI({
    name: [
      "optionsAndSummaryAndPayments",
      bookingData?.promoReferralCode?.code,
      bookingData?.promoReferralCode?.percentage,
      bookingData?.voucherId,
      bookingData?.sessionId,
      bookingData?.optionId,
      bookingData?.cityId,
    ],
    url: priceOptionsBookSummary,
    retry: 1,
    enabled: true,
    method: "post",
    body: {
      promoReferralCode: {
        code: bookingData?.promoReferralCode?.code,
        percentage: bookingData?.promoReferralCode?.percentage,
      },
      chairReservation: null,
      voucherId: bookingData?.voucherId,
      sessionId: bookingData?.sessionId,
      optionId: bookingData?.optionId,
      customerCityId: bookingData?.cityId,
    },
    onSuccess: (res) => {
      // if the isDefault changed show it as  default choosen consider that the selected before not found
      if (
        res?.paymentOptions?.length &&
        +selectedPaymnet !==
          +res?.paymentOptions?.find((pay) => pay?.isDefault)
            ?.paymentMethodId &&
        !res?.paymentOptions?.find(
          (pay) => pay?.paymentMethodId === +selectedPaymnet
        )
      ) {
        setSelectedPayment(
          res?.paymentOptions?.find((pay) => pay?.isDefault)?.paymentMethodId
        );
      }
      setAllPaymentDetails(
        res?.paymentOptions?.map((pay) => ({
          ...pay,
          image: putImageForPaymentType(pay?.paymentMethodId),
        }))
      );
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });
  /* -------------------------------------------------------------------------- */
  /*                    enable the wallet action for payment                    */
  /* -------------------------------------------------------------------------- */
  const {
    data: walletEnableRes,
    isFetching: walletFetching,
    refetch: callWalletRes,
  } = CallAPI({
    name: [
      "getEnableWalletRes",
      bookingData?.walletData?.checked,
      voucherDataRes?.customerData?.wallet,
      bookingData?.paymentOption,
    ],
    url: enableWalletOption,
    enabled:
      !!voucherDataRes?.customerData?.wallet &&
      !!bookingData?.paymentOption &&
      !!paymentOptions?.bookingPriceResponse?.find(
        (v) => v?.key?.includes("Total") || v?.key?.includes("المجموع الكلي")
      )?.value &&
      paymentOptions?.intialPayment >= 0,
    method: "post",
    body: {
      walletValue: voucherDataRes?.customerData?.wallet,
      paymentOption: bookingData?.paymentOption,
      total: paymentOptions?.bookingPriceResponse?.find(
        (v) => v?.key?.includes("Total") || v?.key?.includes("المجموع الكلي")
      )?.value,
      deposit: paymentOptions?.intialPayment,
    },
    onSuccess: (res) => {
      setCanUseOnline(res?.canUseOnlineIfValid);
      //   if (!res?.canUseOnlineIfValid && bookingData?.walletData?.checked) {
      //     setbookingData({ ...bookingData, paymentOption: 1 });
      //     setSelectedPayment(1);
      //   } else {
      recallPayment();
      //   }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });
  /* -------------------------------------------------------------------------- */
  /*                  confirm book after voucher coupon wallet                  */
  /* -------------------------------------------------------------------------- */

  const {
    data: confirmBookRes,
    isFetching: confirmBookFetch,
    refetch: ConfirmBookRefetch,
  } = CallAPI({
    name: "confirmBook",
    url: confirmBooking,
    refetchOnWindowFocus: true,
    method: "post",
    body: {
      sessionId: bookingData?.sessionId,
      optionId: bookingData?.optionId,
      customerCityId: bookingData?.cityId,
      cuponCode: bookingData?.promoReferralCode?.code,
      totalPriceVAT: paymentOptions?.bookingPriceResponse?.find(
        (v) => v?.key?.includes("Total") || v?.key?.includes("المجموع الكلي")
      )?.value,
      voucherId: bookingData?.voucherId,
      isWallet: bookingData?.walletData?.checked,
      paymentOptionIfOline: bookingData?.paymentOption,
      isOnline: bookingData?.paymentOption === 1 ? false : true,
      //   isOnline: walletEnableRes?.canUseOnlineIfValid,
      bookingSourceApp: 1,
      hasPackage: paymentOptions?.packages?.length > 0 ? true : false,
      isHome: bookingData?.atHome,
      hasChairReservation: false,
      cityfees: bookingData?.cityfees,
    },
    onSuccess: (res) => {
      if (
        res?.reuireRedirect &&
        (res?.updatedItems?.messageType === 2 ||
          res?.updatedItems?.messageType === 3)
      ) {
        setOpenUnavailable(true);
      }
      if (!res?.reuireRedirect) {
        setbookingData({
          ...bookingData,
          onlinePayValue: res?.onlinePaymentDetails?.onlinePayment?.onlineValue,
        });

        setOpenPricePaymentDetailsModal(true);
      }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });

  const {
    data: bookScheduleRes,
    isFetching: bookScheduleFetch,
    refetch: bookScheduleRefetch,
  } = CallAPI({
    name: "bookSchedule",
    url: bookSchedule,
    retry: 1,
    method: "post",
    body: {
      sessionId: bookingData?.sessionId,
      optionId: bookingData?.optionId,
      customerAddressId: bookingData?.customerAddressId,
      chairServiceProviderId: null,
      couponCode: bookingData?.promoReferralCode?.code,
      voucherId: bookingData?.voucherId,
      paymentMethodId: bookingData?.paymentOption,
      isWalletEnabled: bookingData?.walletData?.checked,
      totalBookingPriceWithChair:
        confirmBookRes?.updatedTotalPrice > 0
          ? confirmBookRes?.updatedTotalPrice
          : paymentOptions?.bookingPriceResponse?.find(
              (v) =>
                v?.key?.includes("Total") || v?.key?.includes("المجموع الكلي")
            )?.value,
      totalWalletPaidAmount:
        confirmBookRes?.onlinePaymentDetails?.onlinePayment?.walletValue > 0
          ? confirmBookRes?.onlinePaymentDetails?.onlinePayment?.walletValue
          : 0,
      notes: note,
    },
    onSuccess: (res) => {
      if (res && bookingData?.paymentOption === 1) {
        setStep(steps.success);
      }
      if (res && res?.requiredOnlineAmount === 0) {
        setStep(steps.success);
      }
      localStorage.setItem("bookingId", res?.bookingId);
      setbookingData({ ...bookingData, bookingId: res?.bookingId });
    },
    onError: (err) => {
      if (+err?.response?.data?.error?.code === 6144) {
        setbookingData({
          ...bookingData,
          walletData: {
            checked: false,
            balance: 0,
          },
        });
      }
      //   error of price changed to refetch the confirmBooking again
      //   error when the service is deleted and item not found
      //   6144 error when wallet balance is Insufficient
      if (
        +err?.response?.data?.error?.code === 6137 ||
        +err?.response?.data?.error?.code === 554 ||
        +err?.response?.data?.error?.code === 6144
      ) {
        setTimeout(() => {
          ConfirmBookRefetch();
        }, 500);
      } else {
        toast.error(err?.response?.data?.error?.message);
      }
    },
    select: (res) => res?.data?.data,
  });
  useEffect(() => {
    setbookingData({
      ...bookingData,
      walletData: {
        checked:
          voucherDataRes?.customerData?.wallet <= 0 ? false : walletCheck,
        balance: voucherDataRes?.customerData?.wallet,
      },
    });
  }, [walletCheck, voucherDataRes]);

  useEffect(() => {
    if (selectedPaymnet) {
      setbookingData({
        ...bookingData,
        paymentOption: selectedPaymnet,
      });
    }
  }, [selectedPaymnet]);
  useEffect(() => {
    if (note && note?.length > 200) {
      setNoteFieldError(messages["booking.note.max"]);
    } else {
      setNoteFieldError(false);
    }
  }, [note]);

  return (
    <>
      <h2 className="employees-header">
        <p className="viewstepper_name">
          <button type="button" onClick={() => handleStepper()}>
            <SvgIcon
              src={`/Icons/arrow${locale === "ar" ? "forward" : "back"}.svg`}
            />
          </button>
        </p>
        <span>{messages["common.summary"]}</span>
        <div className="current-step">
          ({messages["common.step"]}{" "}
          <span className="mx-1">
            {step === steps.checkout && !bookingData.atHome ? step - 1 : step} /{" "}
            {bookingData.atHome ? 5 : 4}
          </span>
          )
        </div>
      </h2>
      <CheckoutTemp
        walletCheck={walletCheck}
        setWalletCheck={setWalletCheck}
        openChnagePayment={openChnagePayment}
        setOpenchangePayment={setOpenchangePayment}
        selectedPaymnet={selectedPaymnet}
        allPaymentDetails={allPaymentDetails}
        setSelectedPayment={setSelectedPayment}
        setOpenRedirectModal={setOpenRedirectModal}
        openRedirectModal={openRedirectModal}
        note={note}
        setNote={setNote}
        openPricePaymentDetailsModal={openPricePaymentDetailsModal}
        setOpenPricePaymentDetailsModal={setOpenPricePaymentDetailsModal}
        voucherDataRes={voucherDataRes}
        voucherFetching={voucherFetching}
        callWalletRes={callWalletRes}
        enteredCoupon={enteredCoupon}
        setEnteredCoupon={setEnteredCoupon}
        couponFetching={couponFetching}
        couponRefetch={couponRefetch}
        walletEnableRes={walletEnableRes}
        paymentOptions={paymentOptions}
        ConfirmBookRefetch={ConfirmBookRefetch}
        confirmBookRes={confirmBookRes}
        bookScheduleRefetch={bookScheduleRefetch}
        paymentOptionsFetching={paymentOptionsFetching}
        setOpenUnavailable={setOpenUnavailable}
        openUnavailable={openUnavailable}
        setNoteFieldError={setNoteFieldError}
        noteFieldError={noteFieldError}
      />
    </>
  );
}
