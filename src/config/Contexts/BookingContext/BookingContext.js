import { createContext, useState } from "react";

export const BookingContext = createContext();
export const bookingInitValue = {
  atHome: false,
  bookedServices: [],
  bookedPackages: [],
  latitude: 24.7136,
  longitude: 46.6753,
  cityId: 3,
};
const BookingDataProvider = ({ children }) => {
  const [bookingData, setbookingData] = useState(bookingInitValue);

  return (
    <BookingContext.Provider value={{ bookingData, setbookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingDataProvider;
