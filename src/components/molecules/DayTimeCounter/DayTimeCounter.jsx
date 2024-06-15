import { useEffect, useRef, useState } from "react";
import TimeSquare from "../../atoms/TimeSquare/TimeSquare";
import RemaningDays from "../RemaningDays/RemaningDays";
import "./DayTimeCounter.scss";
const DayTimeCounter = ({ offerDate }) => {
  const [secLeft, setSecLeft] = useState("00");
  const [minsLeft, setMinsLeft] = useState("00");
  const [hoursLeft, setHoursLeft] = useState("00");
  const [daysLeft, setDaysLeft] = useState("00");
  const componentMounted = useRef(true); // (3) component is mounted

  function renderCountdown(dateStart) {
    if (!dateStart) return;
    let currentDate = dateStart.getTime();
    let targetDate = new Date().getTime(); // set the countdown date
    let days, hours, minutes, seconds; // variables for time units
    let count = 0;
    var getCountdown = function (c) {
      // find the amount of "seconds" between now and target
      let secondsLeft = (currentDate - targetDate) / 1000 - c;
      days = Math.floor(secondsLeft / 86400);
      setDaysLeft(days || 0);
      hours = Math.floor(secondsLeft / 3600);
      setHoursLeft(hours || 0);
      secondsLeft %= 3600;
      minutes = Math.floor(secondsLeft / 60);
      setMinsLeft(minutes || 0);

      seconds = Math.floor(secondsLeft % 60);
      setSecLeft(seconds || 0);
    };

    getCountdown();
    const interval = setInterval(function () {
      getCountdown(count++);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }

  useEffect(() => {
    if (offerDate) {
      return renderCountdown(new Date(offerDate));
    }
  }, []);

  return (
    <>
      {daysLeft < 2 ? (
        <section className="daytimecounter">
          <TimeSquare number={hoursLeft} />
          <TimeSquare number={minsLeft} />
          <TimeSquare number={secLeft} />
        </section>
      ) : (
        <RemaningDays text={daysLeft} />
      )}
    </>
  );
};

export default DayTimeCounter;
