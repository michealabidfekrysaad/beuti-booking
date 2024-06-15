import ChangeLocationModal from "components/organisms/ChangeLocationModal/ChangeLocationModal";
import {
  BookingContext,
  bookingInitValue,
} from "config/Contexts/BookingContext/BookingContext";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import "./ToggleService.scss";
const handleSingleLocationAccept = (location) =>
  location?.isHome && location?.isSalon ? " " : "singlelocation";
const ToggleServices = () => {
  const { bookingData, setbookingData } = useContext(BookingContext);
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);
  const { messages } = useIntl();
  const { spId } = useParams();

  const [openChangeLocationModal, setOpenChangeLocationModal] = useState(false);
  const handleSwitchServiceLocation = () => {
    if (
      !bookingData.bookedServices.length &&
      !bookingData.bookedPackages.length
    ) {
      return setbookingData({
        ...bookingData,
        atHome: !bookingData.atHome,
      });
    } else {
      if (openChangeLocationModal) {
        setbookingData({
          ...bookingInitValue,
          serviceProviderId: spId,
          atHome: !bookingData.atHome,
        });
        return setOpenChangeLocationModal(false);
      }
      return setOpenChangeLocationModal(true);
    }
  };
  return (
    <section
      className={`${handleSingleLocationAccept(
        serviceProviderInfo?.acceptBookingIn
      )} toggleservices`}
    >
      {serviceProviderInfo?.acceptBookingIn?.isHome && (
        <button
          className={bookingData.atHome ? "active" : ""}
          onClick={handleSwitchServiceLocation}
          disabled={bookingData.atHome}
        >
          {messages["selectservice.tabs.home"]}
        </button>
      )}
      {serviceProviderInfo?.acceptBookingIn?.isSalon && (
        <button
          className={!bookingData.atHome ? "active" : ""}
          onClick={handleSwitchServiceLocation}
          disabled={!bookingData.atHome}
        >
          {messages["selectservice.tabs.salon"]}
        </button>
      )}
      <ChangeLocationModal
        setOpen={setOpenChangeLocationModal}
        open={openChangeLocationModal}
        handleSwitchServiceLocation={handleSwitchServiceLocation}
      />
    </section>
  );
};

export default ToggleServices;
