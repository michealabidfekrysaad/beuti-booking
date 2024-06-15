import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import DetailedBookingModal from "components/atoms/DetailedBookingModal/DetailedBookingModal";
import { CallAPI } from "config/APIS/CallAPIS";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";
import { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "./SubmitButton.scss";
const SubmitButton = ({ disabled }) => {
  const { setbookingData, bookingData } = useContext(BookingContext);
  const { step, setStep } = useContext(StepperContext);
  const { messages } = useIntl();
  const [openSafetyModal, setOpenSafetyModal] = useState(false);
  const { refetch: checkRequireEmployeeCall } = CallAPI({
    name: "requireEmployeesCheck",
    url: "Service/RequireSelectEmployee",
    body: {
      ...bookingData,
    },
    method: "post",
    onSuccess: (isRequire) => {
      if (isRequire) {
        setbookingData({ ...bookingData, isRequiredEmployee: true });
        getServiceEmployeeCall(true);
      } else {
        setbookingData({ ...bookingData, isRequiredEmployee: false });
        setStep(steps.time);
      }
    },
    select: (data) => data.data.data.data,
  });
  const { refetch: getServiceEmployeeCall } = CallAPI({
    name: "getServiceEmployees",
    url: "Service/GetServiceEmployees",
    body: {
      ...bookingData,
    },
    method: "post",
    onSuccess: (data) => {
      if (!!data?.list?.length) {
        setbookingData({ ...bookingData, allEmployees: [...data.list] });
        setStep(steps.employees);
      }
    },
    select: (data) => data.data.data,
  });
  const { data: saftyList, refetch: checkSaftyCall } = CallAPI({
    name: "getCheckingForSafty",
    url: "Booking/GetServicesRequirements",
    method: "post",
    body: {
      serviceIds: [
        ...new Set([
          ...bookingData?.bookedPackages
            ?.map((pack) => pack.services.flat())
            ?.flat()
            ?.map((service) => service.serviceId),
          ...bookingData?.bookedServices?.map((service) => service.serviceId),
        ]),
      ],
    },
    onSuccess: (data) => {
      if (!!data.list.length) {
        setOpenSafetyModal(true);
      } else {
        checkRequireEmployeeCall(true);
      }
    },
    select: (data) => data.data.data,
  });

  const handleSubmit = () => {
    if (step === steps.services) {
      setOpenSafetyModal(false);
      checkRequireEmployeeCall(true);
    }
  };
  return (
    <div className="submit">
      <div>
        <FormattedMessage
          id="service.available.service.num"
          values={{ num: bookingData?.totalServicesNumber }}
        />
      </div>
      <ButtonFilled
        onClick={checkSaftyCall}
        disabled={disabled}
        text={messages["service.book.now"]}
      />
      <DetailedBookingModal
        handleSubmit={handleSubmit}
        setOpen={setOpenSafetyModal}
        open={openSafetyModal}
        saftyList={saftyList?.list}
      />
    </div>
  );
};

export default SubmitButton;
