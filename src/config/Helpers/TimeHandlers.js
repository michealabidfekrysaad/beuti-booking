export const convertTimeToMinuts = (time) => {
  if (!time) return;
  var parts = time.split(":");
  var minutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  return minutes;
};

export const convertMinsToHours = (mins, messages) => {
  if (!mins) return;
  const hrsNum = Math.floor(mins / 60);
  const minsNum = mins % 60;
  return `${hrsNum === 0 ? `` : `${hrsNum} ${messages["common.hours"]} `}${
    minsNum === 0 ? `` : `${minsNum} ${messages["common.minutes"]}`
  }`;
};

export const DisplayTimeRange = (min, max, messages) => {
  if (!min || !max) return;
  if (min === max) {
    return convertMinsToHours(min, messages);
  }

  return `${convertMinsToHours(min, messages)} - ${convertMinsToHours(
    max,
    messages
  )}`;
};

export const returnTotalTimeForBooking = (bookingData, messages) => {
  const maxDurationAllServices = bookingData?.bookedServices
    ?.map((el) => el?.maxDuration)
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const minDurationAllServices = bookingData?.bookedServices
    ?.map((el) => el?.minDuration)
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const maxDurationAllPackages = bookingData?.bookedPackages
    ?.map((el) => el?.maxDuration)
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  const minDurationAllPackages = bookingData?.bookedPackages
    ?.map((el) => el?.minDuration)
    .reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  return DisplayTimeRange(
    maxDurationAllServices + maxDurationAllPackages,
    minDurationAllServices + minDurationAllPackages,
    messages
  );
};
