/* eslint-disable no-useless-concat */
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./NewPicker.scss";
import arSaLocale from "date-fns/locale/ar-SA";
import enLocale from "date-fns/locale/en-US";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useIntl, FormattedMessage } from "react-intl";
import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import moment from "moment";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";

export default function PickerTemp({
  openPicker,
  selectedDate,
  setSelectedDate,
  setSelectedMonthYear,
  setOpenPicker,
  availableSlots,
  returnTimeArabicEnglish,
  timeSlotsFetching,
  nearestOpenData,
  samePrice,
  setSelectedOptionId,
  selectTimeFetch,
}) {
  const { locale, messages } = useIntl();
  const { bookingData, setbookingData } = useContext(BookingContext);
  return (
    <>
      <Row>
        <Col xs={12} className="picker">
          <div className="close--open">
            <div
              className="close--open-picker"
              style={{
                maxHeight: openPicker ? "100%" : "180px",
              }}
            >
              <LocalizationProvider
                adapterLocale={locale === "ar" ? arSaLocale : enLocale}
                dateAdapter={AdapterDateFns}
              >
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setbookingData({
                      ...bookingData,
                      PickerBookingDate: newValue,
                    });
                    setSelectedDate(newValue);
                  }}
                  format="dd MMMM yyyy"
                  renderInput={(params) => <TextField {...params} />}
                  //   renderDay={(day) => (
                  //     <div role="cell">
                  //       <button
                  //         type="button"
                  //         aria-label="Jul 10, 2022"
                  //         tabindex="-1"
                  //         className="MuiButtonBase-root MuiPickersDay-root MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root"
                  //         onClick={() => console.log(day.getMonth() + 1)}
                  //       >
                  //         {day.getDate()}
                  //         <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                  //         <span>dot</span>
                  //       </button>
                  //     </div>
                  //   )}
                  //   renderDay={(day, selected, events) => {
                  //     console.log(day);
                  //     console.log(selected);
                  //     console.log(events);
                  //     return (
                  //       <>
                  //         <div>{day.getDate()}</div>
                  //       </>
                  //     );
                  //   }}
                  onMonthChange={(e) =>
                    setSelectedMonthYear(
                      moment(e, "YYYY/MM/DD").format("MMMM YYYY")
                    )
                  }
                  onYearChange={(e) =>
                    setSelectedMonthYear(
                      moment(e, "YYYY/MM/DD").format("MMMM YYYY")
                    )
                  }
                  //   disabled={timeSlotsFetching}
                  readOnly={timeSlotsFetching}
                  // used to disable whole picker
                  disablePast
                  shouldDisableYear={(year) => {
                    console.log(moment(year).year(), moment().year() + 1);
                    return moment(year).year() > moment().year() + 1;
                  }}
                  //   shouldDisableYear={(year) => 2022 >= 2022 && 2023 >= 2023}
                  // used to disable the past days and monthes
                  //   shouldDisableDate={(day) =>
                  //     +day.getDay() ===
                  //     offDays?.data?.find((data) => data === day.getDay())
                  //   } used to disable index of the day 0,1,2,3,4,5,6 every week
                  //   maxDate={new Date()}  disable the future days only after today
                  //   minDate={new Date()} disable the past days only before today
                  loading={timeSlotsFetching}
                  renderLoading={() => <div className="loading"></div>}
                  // if you want to put custom loader for component instead
                  //   showDaysOutsideCurrentMonth={true} display days outside the month
                />
              </LocalizationProvider>
            </div>
            {/* <div
              className="close--open-arrow"
              onClick={() => setOpenPicker(!openPicker)}
            >
              <SvgIcon
                src={`/Icons/${!openPicker ? "arrowDown" : "arrowUp"}.svg`}
              />
            </div> */}
          </div>
        </Col>
      </Row>

      {availableSlots?.length > 0 && (
        <Row className="time mb-5 pb-5">
          {availableSlots?.map((slot, index) => (
            <Col xs={12} key={slot?.optionId}>
              <button
                className="time-available"
                type="button"
                onClick={() => {
                  setbookingData({
                    ...bookingData,
                    bookingDateTime: slot?.timeSaved,
                    optionId: slot?.optionId,
                  });
                  setSelectedOptionId(slot?.optionId);
                }}
                disabled={timeSlotsFetching || selectTimeFetch}
              >
                <div className="time-available_slot">
                  <span className="mx-2">
                    {returnTimeArabicEnglish(slot.timeDisplay)}
                  </span>
                  <span className="mx-5 time-available_slot-next--day">
                    {" "}
                    {slot.isNextDay && messages["common.next.day"]}{" "}
                  </span>
                </div>
                <div className="d-flex loader-holder">
                  {samePrice > 1 &&
                    !selectTimeFetch &&
                    slot?.optionId !== bookingData?.optionId && (
                      <span className="mx-5 time-available_slot">
                        {slot?.optionPriceWithVAT} {messages["common.currency"]}
                      </span>
                    )}
                  <div>
                    {slot?.optionId !== bookingData?.optionId && (
                      <img
                        src={`/Icons/arrow${
                          locale === "en" ? "Right" : "Left"
                        }.svg`}
                        alt="arrow"
                      />
                    )}
                    {slot?.optionId === bookingData?.optionId &&
                      selectTimeFetch && <div className="loading"></div>}
                  </div>
                </div>
              </button>
            </Col>
          ))}
        </Row>
      )}
      {!availableSlots?.length && nearestOpenData && (
        <Row className="mb-5">
          <Col xs={12} className="closed">
            <img src="/Icons/closedDay.svg" alt="arrow" />
            <div className="text-center">
              <div className="closed-day--closed">
                {messages["picker.closing.today"]}
              </div>
              <div className="closed-day--book">
                <FormattedMessage
                  id="picker.book.for.day"
                  values={{
                    day: nearestOpenData?.day,
                    num: nearestOpenData?.num,
                    month: nearestOpenData?.month,
                  }}
                />
              </div>
            </div>
            <ButtonFilled
              text={
                <FormattedMessage
                  id="picker.book.for.day.button"
                  values={{ day: nearestOpenData?.day }}
                />
              }
              className="closed-btn"
              onClick={() => {
                setSelectedDate(nearestOpenData?.newBookingDate);
                setbookingData({
                  ...bookingData,
                  PickerBookingDate: nearestOpenData?.newBookingDate,
                });
              }}
              disabled={timeSlotsFetching}
            />
          </Col>
        </Row>
      )}
    </>
  );
}
