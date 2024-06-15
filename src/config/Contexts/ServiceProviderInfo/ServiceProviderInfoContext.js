import { CallAPI } from "config/APIS/CallAPIS";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingContext } from "../BookingContext/BookingContext";

export const ServiceProviderInfoContext = createContext();
const initValue = { isBookingWizardEnabled: true };
const ServiceProviderInfoProvider = ({ children }) => {
  const [serviceProviderInfo, setServiceProviderInfo] = useState(initValue);
  const { setbookingData, bookingData } = useContext(BookingContext);
  const { User } = useContext(UserContext);

  const { spId, spName } = useParams();
  useEffect(() => {
    setbookingData({ ...bookingData, serviceProviderId: spId });
  }, []);
  CallAPI({
    name: "getBasicInfo",
    url: "Booking/GetBookingBasicInfo",
    enabled: !!User.access_token_booking,
    retry: 1,
    query: {
      id: spId,
      name: spName,
    },
    onSuccess: (res) => {
      setServiceProviderInfo({ ...serviceProviderInfo, ...res });
      setbookingData({ ...bookingData, spImageUrl: res?.imageUrl });
      getServicePlaceCall();
    },
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  const { refetch: getServicePlaceCall } = CallAPI({
    name: "acceptedLocation",
    url: "Booking/GetSPServicesLocation",
    query: {
      spId,
    },
    onSuccess: (data) => {
      setServiceProviderInfo({
        ...serviceProviderInfo,
        acceptBookingIn: data,
      });

      if (!data.isSalon) {
        setbookingData({
          ...bookingData,
          atHome: true,
        });
      }
    },
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
  return (
    <ServiceProviderInfoContext.Provider
      value={{ serviceProviderInfo, setServiceProviderInfo }}
    >
      {children}
    </ServiceProviderInfoContext.Provider>
  );
};

export default ServiceProviderInfoProvider;
