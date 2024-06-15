import { useEffect, useState } from "react";
import "./TimeSquare.scss";
// let intervalCountDown;
const TimeSquare = ({ number, className = "" }) => {
  return (
    <div className={`timesquare ${className}`}>
      {number < 10 ? `0${number}` : number}
    </div>
  );
};

export default TimeSquare;
