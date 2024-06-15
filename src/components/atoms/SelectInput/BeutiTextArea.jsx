/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import PropTypes from "prop-types";

import "./BeutiSelect.scss";
/* -------------------------------------------------------------------------- */
/*                      Input For useForm Or Native textarea                     */
/* -------------------------------------------------------------------------- */
const BeutiTextArea = ({
  label,
  error,
  list,
  onChange,
  value,
  disabled,
  labelClass,
  className,
  labelId,
  note,
  ...props
}) => {
  const errorClassHandle = (type) =>
    `beuti-textarea__${type} ${error ? `beuti-textarea__${type}-error` : ""} `;
  return (
    <>
      <div className="beuti-textarea">
        {label && (
          <label
            htmlFor={labelId}
            className={`${errorClassHandle("label")} ${labelClass || ""}`}
          >
            {label}
          </label>
        )}
        <textarea
          className={`${errorClassHandle("field")} ${className || ""}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        {error && <p className="beuti-input__errormsg">{error}</p>}
        {note && !error && <p className="beuti-input__note">{note}</p>}
      </div>
    </>
  );
};

BeutiTextArea.propTypes = {
  label: PropTypes.string,
  labelId: PropTypes.string,
  labelClass: PropTypes.string,
  note: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  list: PropTypes.array,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
export default BeutiTextArea;
