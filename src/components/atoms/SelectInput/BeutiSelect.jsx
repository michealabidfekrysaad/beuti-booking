/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import PropTypes from "prop-types";
import "./BeutiSelect.scss";
import { MenuItem, Select } from "@mui/material";
const BeutiSelect = ({
  label,
  error,
  list,
  onChange,
  value,
  disabled,
  labelClass,
  className,
  note,
  disabledOptions,
  dontShowErrorMessage,
  ...props
}) => {
  return (
    <>
      <div className="beutiselect">
        {label && (
          <label htmlFor={label} className={`beutiselect-label ${labelClass}`}>
            {label}
          </label>
        )}
        <Select
          labelId={label}
          className={`beutiselect-dropdown ${error ? "error-border " : " "} ${
            className || " "
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          {list?.map((hour) => (
            <MenuItem
              className="beutiselect-dropdown--item"
              key={hour.key || hour.id}
              value={hour.id}
              disabled={disabledOptions && disabledOptions(hour.id)}
            >
              {hour.text}
            </MenuItem>
          ))}
        </Select>
        {error && !dontShowErrorMessage && (
          <p className="beuti-input__errormsg">{error}</p>
        )}
        {note && !error && <p className="beuti-input__note">{note}</p>}
      </div>
    </>
  );
};

BeutiSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelClass: PropTypes.string,
  note: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  list: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabledOptions: PropTypes.func,
  dontShowErrorMessage: PropTypes.bool,
};
export default BeutiSelect;
