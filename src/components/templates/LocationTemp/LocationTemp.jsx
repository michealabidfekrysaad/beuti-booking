import React, { useContext } from "react";
import "./LocationTemp.scss";
import AddNewAddress from "components/organisms/AddNewAddress/AddNewAddress";
import SavedAddress from "components/organisms/SavedAddress/SavedAddress";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";

const LocationTemp = ({
  bookingData,
  setbookingData,
  handleSelectOnMap,
  handleAutoCompelete,
  savedAddress,
  handleSelectLocation,
  callSavedAddress,
}) => {
  const { isMapView } = useContext(StepperContext);

  return (
    <>
      {isMapView ? (
        <AddNewAddress
          bookingData={bookingData}
          handleSelectOnMap={handleSelectOnMap}
          handleAutoCompelete={handleAutoCompelete}
          setbookingData={setbookingData}
          callSavedAddress={callSavedAddress}
        />
      ) : (
        <SavedAddress
          bookingData={bookingData}
          setbookingData={setbookingData}
          savedAddress={savedAddress}
          handleSelectLocation={handleSelectLocation}
        />
      )}
    </>
  );
};

export default LocationTemp;
