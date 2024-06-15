import React, { useContext } from "react";

import LocationTemp from "components/templates/LocationTemp/LocationTemp";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import Geocode from "react-geocode";
import { CallAPI } from "config/APIS/CallAPIS";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";

Geocode.setApiKey("AIzaSyCXSqY3dwzoUPCPlqZg0Bx8ePReOt4Jbdo");

const LocationPage = () => {
  const { setbookingData, bookingData } = useContext(BookingContext);
  const { setStep } = useContext(StepperContext);
  const { data: savedAddressRes, refetch: callSavedAddress } = CallAPI({
    name: "SavedAdddress",
    retry: 0,
    url: "Address/Get",
    enabled: !!bookingData.serviceProviderId,
    query: {
      branchId: bookingData.serviceProviderId,
    },
    select: (data) => data.data.data.list,
  });
  const handleAutoCompelete = (place) => {
    if (!place.geometry) return;
    setbookingData({
      ...bookingData,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      address: place.formatted_address,
    });
  };
  const handleSelectOnMap = (place) => {
    Geocode.fromLatLng(place.lat, place.lng).then(
      (response) => {
        setbookingData({
          ...bookingData,
          latitude: place.lat,
          longitude: place.lng,
          address: response.results[0].formatted_address,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const handleSelectLocation = (city) => {
    if (city) {
      setbookingData({
        ...bookingData,
        customerCityId: city.id,
        customerAddressId: city.id,
        cityId: city.cityId,
        cityfees: city.branchCityFees,
      });
      return setStep(steps.checkout);
    }
  };
  return (
    <>
      <LocationTemp
        handleSelectOnMap={handleSelectOnMap}
        handleAutoCompelete={handleAutoCompelete}
        handleSelectLocation={handleSelectLocation}
        bookingData={bookingData}
        setbookingData={setbookingData}
        savedAddress={savedAddressRes}
        callSavedAddress={callSavedAddress}
      />
    </>
  );
};

export default LocationPage;
