import AlertBeuti from "components/atoms/AlertBeuti/AlertBeuti";
import BookingStatus from "components/organisms/CheckoutSections/BookingStatus/BookingStatus";
import GlobalLoader from "components/organisms/GlobalLoader/GlobalLoader";
import InvoiceServices from "components/organisms/InvoiceServices/InvoiceServices";
import Navbar from "components/organisms/Navbar/Navbar";
import SubmitButton from "components/organisms/Submit/SubmitButton";
import { AxiosContext } from "config/APIS/AxiosConfig";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import CheckoutPage from "./CheckoutPage";
import EmployeesPage from "./EmployeesPage";
import LocationPage from "./LocationPage";
import ServicesPage from "./ServicesPage";
import TimePickerPage from "./TimePickerPage";

const StepsWrapper = () => {
  const { bookingData } = useContext(BookingContext);
  const { User } = useContext(UserContext);
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);
  const { step, isMapView } = useContext(StepperContext);
  const { loader } = useContext(AxiosContext);
  const handleDisplaySubmit = () => {
    if (
      step === steps.services &&
      (!!bookingData.bookedServices.length ||
        !!bookingData.bookedPackages.length)
    ) {
      return true;
    }

    return false;
  };
  return (
    <section
      className={
        !serviceProviderInfo.isBookingWizardEnabled || User.isBlocked
          ? "disabled-salon"
          : ""
      }
    >
      <Navbar />
      {!serviceProviderInfo.isBookingWizardEnabled && (
        <AlertBeuti
          text={
            <FormattedMessage
              id="sp.not.accept.booking.alert"
              values={{
                name: serviceProviderInfo?.name,
              }}
            />
          }
        />
      )}
      {User.isBlocked && (
        <AlertBeuti
          text={
            <FormattedMessage
              id="sp.block.user"
              values={{
                name: User?.spName,
                phone: User?.spTelephone,
              }}
            />
          }
        />
      )}
      {step <= 5 && (
        <>
          {/* <ViewStepper /> */}
          {!isMapView && (
            <>
              {step !== steps.checkout && (
                <>
                  <InvoiceServices />
                  {/* <FooterServiceInvoice /> */}
                </>
              )}
            </>
          )}
          <section
            className="views"
            style={{ marginTop: step === steps.services ? 136 : 80 }}
          >
            <Row>
              <Col xs="12" lg={!isMapView ? "8" : "12"}>
                {step === steps.services && <ServicesPage />}
                {step === steps.employees && <EmployeesPage />}
                {step === steps.time && <TimePickerPage />}
                {step === steps.location && <LocationPage />}
                {step === steps.checkout && <CheckoutPage />}
              </Col>
            </Row>
            {/* screen of failure success pending */}
          </section>
        </>
      )}
      {step === steps.failed && <BookingStatus status="failed" />}
      {step === steps.success && <BookingStatus status="success" />}
      {handleDisplaySubmit() && (
        <SubmitButton disabled={!serviceProviderInfo?.isBookingWizardEnabled} />
      )}
      {loader && <GlobalLoader />}
    </section>
  );
};

export default StepsWrapper;
