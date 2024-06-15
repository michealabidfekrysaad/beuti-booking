import { createContext, useContext, useState } from "react";
import { BookingContext } from "../BookingContext/BookingContext";

export const StepperContext = createContext();
export const steps = {
  services: 1,
  employees: 2,
  time: 3,
  location: 4,
  checkout: 5,
  success: 6,
  failed: 7,
};
export const bookingStatus = {};
const StepperProvider = ({ children }) => {
  const { bookingData, setbookingData } = useContext(BookingContext);

  const [step, setStep] = useState(steps.services);
  const [isMapView, setIsMapView] = useState(false);
  const handleStepper = () => {
    if (step === steps.location && isMapView) {
      return setIsMapView(false);
    }
    if (step === steps.time && !bookingData.isRequiredEmployee) {
      return setStep(steps.services);
    }
    if (step === steps.employees) {
      setbookingData({ ...bookingData, employeeId: null });
      return setStep(step - 1);
    }
    if (step === steps.checkout && !bookingData.atHome) {
      return setStep(steps.time);
    }
    return setStep(step - 1);
  };
  return (
    <StepperContext.Provider
      value={{ step, setStep, handleStepper, isMapView, setIsMapView }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export default StepperProvider;
