import EmployeeSelection from "components/organisms/EmployeeSelection/EmployeeSelection";
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./EmpTemp.scss";
import { useIntl } from "react-intl";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
export default function EmpTemp({ allEmployees, handleSelectEmployee }) {
  const { messages, locale } = useIntl();
  const { handleStepper } = useContext(StepperContext);
  const { bookingData } = useContext(BookingContext);

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
        <span>{messages["employee.select"]}</span>
        <span className="current-step">
          <div className="current-step">
            ({messages["common.step"]}{" "}
            <span className="mx-1">2 / {bookingData.atHome ? 5 : 4}</span>)
          </div>
        </span>
      </h2>
      <EmployeeSelection
        id={0}
        empName={messages["employee.no.preference"]}
        onClick={(id) => handleSelectEmployee(id)}
        image="/Images/nopref.png"
      />
      {allEmployees?.map((emp) => (
        <EmployeeSelection
          key={emp.employeeId}
          empName={emp?.name}
          empInfo={emp?.title}
          ratingNum={emp?.rate}
          price={bookingData.showEmployeesPrice && emp?.totalPriceWithVat}
          isFrom={emp?.isPriceFrom}
          image={emp?.image}
          id={emp.employeeId}
          onClick={(id) => handleSelectEmployee(id)}
        />
      ))}
    </>
  );
}

EmpTemp.propTypes = {
  handleSelectEmployee: PropTypes.func,
  allEmployees: PropTypes.array,
};
