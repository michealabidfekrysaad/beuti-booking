import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import {
  steps,
  StepperContext,
} from "config/Contexts/StepperContext/StepperContext";
import { useContext } from "react";
import { useIntl } from "react-intl";
import SvgIcon from "../../atoms/Icons/SvgIcon";
import "./ViewStepper.scss";

const ViewStepper = () => {
  const { locale, messages } = useIntl();
  const { step, handleStepper } = useContext(StepperContext);
  const { bookingData } = useContext(BookingContext);
  return (
    <div className="viewstepper">
      <p className="viewstepper_name">
        {step > 1 && (
          <button type="button" onClick={() => handleStepper()}>
            <SvgIcon
              src={`/Icons/arrow${locale === "ar" ? "forward" : "back"}.svg`}
            />
          </button>
        )}
        <span>
          {step === steps.services && messages["services"]}
          {step === steps.employees && messages["employee.select"]}
          {step === steps.time && messages["picker.select.date"]}
          {step === steps.location && messages["common.location"]}
          {step === steps.checkout && messages["common.summary"]}
        </span>
      </p>
      <div className="viewstepper_step ">
        {messages["common.step"]}
        <span className="viewstepper_step__count mx-2">
          {step === steps.checkout && !bookingData.atHome ? step - 1 : step} /{" "}
          {bookingData.atHome ? 5 : 4}
        </span>
      </div>
    </div>
  );
};

export default ViewStepper;
