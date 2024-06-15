import React, { useContext, useEffect } from "react";
import EmpTemp from "components/templates/EmpTemp/EmpTemp";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";

const EmployeesPage = () => {
  const { setbookingData, bookingData } = useContext(BookingContext);
  const { setStep } = useContext(StepperContext);

  const handleSelectEmployee = (id) => {
    if (id) {
      setbookingData({ ...bookingData, employeeId: id });
      return setStep(steps.time);
    }
    setbookingData({ ...bookingData, employeeId: null });
    return setStep(steps.time);
  };
  useEffect(() => {
    if (!!bookingData.allEmployees.length) {
      const totalServicePrice =
        bookingData?.bookedServices.reduce((prev, next) => {
          return prev + next?.price || 0;
        }, 0) +
        bookingData?.bookedPackages.reduce((prev, next) => {
          return prev + next?.price || 0;
        }, 0);

      setbookingData({
        ...bookingData,
        showEmployeesPrice: !bookingData.allEmployees.every(
          (empy) => +empy.totalPriceWithVat === +totalServicePrice
        ),
      });
    }
  }, [bookingData.allEmployees]);

  return (
    <>
      <EmpTemp
        allEmployees={bookingData.allEmployees}
        handleSelectEmployee={handleSelectEmployee}
      />
    </>
  );
};

export default EmployeesPage;
