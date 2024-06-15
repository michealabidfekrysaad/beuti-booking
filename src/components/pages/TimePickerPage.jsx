/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import PickerTemp from "components/templates/PickerTemp/PickerTemp";
import { useParams } from "react-router-dom";
import { CallAPI } from "config/APIS/CallAPIS";
import {
  getTimeSlotBooking,
  selectBookingSlot,
} from "config/APIS/EndPoints/EndPoints";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { useIntl } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import SingInPage from "./SingInPage";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";
import SvgIcon from "components/atoms/Icons/SvgIcon";

const TimePickerPage = () => {
  const { locale, messages } = useIntl();
  const { bookingData, setbookingData } = useContext(BookingContext);
  const [selectedDate, setSelectedDate] = useState(
    bookingData?.PickerBookingDate || new Date()
  );
  const { setStep, handleStepper } = useContext(StepperContext);
  const [nearestOpenData, setNearestOpenData] = useState(false);
  const [allPrices, setAllPrices] = useState([]);
  const [samePrice, setSamePrice] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(false);
  const [openPicker, setOpenPicker] = useState(true);
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    moment(new Date(), "YYYY/MM/DD").format("MMMM YYYY")
  );
  const [availableSlots, setAvailableSlotes] = useState([]);
  //   check if timeSlots has the same price or not
  const samePriceOrMore = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  useEffect(() => {
    if (allPrices?.length) {
      setSamePrice(allPrices?.filter(samePriceOrMore)?.length);
      setAllPrices([]);
    }
  }, [allPrices]);
  useEffect(() => {
    if (selectedDate) {
      setbookingData({
        ...bookingData,
        PickerBookingDate: selectedDate,
      });
    }
  }, [selectedDate]);
  const { User } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const { isFetching: timeSlotsFetching, refetch: refetchTimeSlot } = CallAPI({
    name: ["getTimeSlotForBooking", selectedDate],
    url: getTimeSlotBooking,
    enabled: true,
    retry: 1,
    method: "post",
    refetchOnWindowFocus: false,
    body: {
      bookingDate: selectedDate,
      ...bookingData,
      bookedPackages: bookingData?.bookedPackages?.map((pack) => ({
        ...pack,
        services: pack.services
          ?.map((serv) =>
            Array(serv?.count).fill({
              ...serv,
            })
          )
          ?.flat(),
      })),
    },
    onSuccess: (res) => {
      setAvailableSlotes([]);
      setAllPrices((oldPrices) => [
        ...oldPrices,
        res?.dayBookingOptions?.optionPriceWithVAT,
      ]);
      if (
        +new Date(res?.bookingDate)?.getDate() !== +selectedDate?.getDate() ||
        +new Date(res?.bookingDate)?.getMonth() !== +selectedDate?.getMonth() ||
        +new Date(res?.bookingDate)?.getYear() !== +selectedDate?.getYear()
      ) {
        //   to appear the image with button add the below data with availableSlots empty[]
        setAvailableSlotes([]);
        setNearestOpenData({
          day: new Date(res?.bookingDate)?.toLocaleDateString(locale, {
            weekday: "long",
          }),
          num: new Date(res?.bookingDate)?.getDate(),
          month: new Date(res?.bookingDate)?.toLocaleDateString(locale, {
            month: "long",
          }),
          newBookingDate: new Date(res?.bookingDate),
        });
      } else {
        setNearestOpenData(false);
        res?.dayBookingOptions?.forEach((options) => {
          setAvailableSlotes((current) => [
            ...current,
            {
              timeSaved: moment(options?.bestBookingOption?.time).format(
                "hh:mm"
              ),
              timeDisplay: moment(options?.bestBookingOption?.time).format(
                "hh:mm:a"
              ),
              optionId: options?.bestBookingOption?.optionId,
              optionPriceWithVAT:
                options?.bestBookingOption?.optionPriceWithVAT,
              isNextDay: options?.bestBookingOption?.isNextDay,
            },
          ]);
        });
      }
      setbookingData({ ...bookingData, sessionId: res?.sessionId });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error?.message);
    },
    select: (res) => res?.data?.data,
  });

  const { isFetching: selectTimeFetch, refetch: refetchSelectTime } = CallAPI({
    name: "selectTimeForBook",
    url: selectBookingSlot,
    retry: 0,
    method: "put",
    refetchOnWindowFocus: false,
    query: {
      sessionId: bookingData?.sessionId,
      optionId: bookingData?.optionId,
    },
    onSuccess: (res) => {
      if (bookingData.atHome) {
        return setStep(steps.location);
      }
      return setStep(steps.checkout);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error?.message);
      refetchTimeSlot();
    },
    select: (res) => res?.data?.data,
  });

  useEffect(() => {
    if (selectedOptionId && !User.isBlocked) {
      if (User?.userData_booking) {
        refetchSelectTime();
      } else {
        setOpenModal(true);
      }
    }
  }, [selectedOptionId]);
  useEffect(() => {
    if (User.name && selectedOptionId && !User.isBlocked) {
      refetchSelectTime();
    }
  }, [User.name, selectedOptionId]);

  const returnTimeArabicEnglish = (time) => {
    if (time?.split(":")[2]?.includes("am")) {
      if (locale === "ar") {
        return (
          time?.split(":")[0] +
          ":" +
          time?.split(":")[1] +
          " " +
          messages["picker.data.am"]
        );
      }
      return (
        time?.split(":")[0] +
        ":" +
        time?.split(":")[1] +
        " " +
        messages["picker.data.am"]
      );
    }
    if (locale === "ar") {
      return (
        time?.split(":")[0] +
        ":" +
        time?.split(":")[1] +
        " " +
        messages["picker.data.pm"]
      );
    }
    return (
      time?.split(":")[0] +
      ":" +
      time?.split(":")[1] +
      " " +
      messages["picker.data.pm"]
    );
  };
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
        <span>{messages["picker.select.date"]}</span>
        <div className="current-step">
          ({messages["common.step"]}{" "}
          <span className="mx-1">3 / {bookingData.atHome ? 5 : 4}</span>)
        </div>
      </h2>
      <PickerTemp
        openPicker={openPicker}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedMonthYear={setSelectedMonthYear}
        setOpenPicker={setOpenPicker}
        availableSlots={availableSlots}
        returnTimeArabicEnglish={returnTimeArabicEnglish}
        timeSlotsFetching={timeSlotsFetching}
        nearestOpenData={nearestOpenData}
        samePrice={samePrice}
        setSelectedOptionId={setSelectedOptionId}
        selectTimeFetch={selectTimeFetch}
      />
      <SingInPage
        openModal={openModal}
        setOpenModal={setOpenModal}
        getOtpForNum="getOtpForCustomerPicker"
        confirmOtpCode="confirmOtpCodePicker"
        enterCustomerName="enterNamePicker"
      />
    </>
  );
};

export default TimePickerPage;
