/* eslint-disable react/jsx-props-no-spreading */

import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import "./Inputs.scss";
/* -------------------------------------------------------------------------- */
/*                      Input For useForm Or Native input                     */
/* -------------------------------------------------------------------------- */
const Input = ({
  label,
  error,
  error2,
  list,
  onChange,
  value,
  disabled,
  labelClass,
  className,
  labelId,
  useFormRef,
  objectUseForm,
  note,
  info = "",
  ...props
}) => {
  const { locale } = useIntl();
  const errorClassHandle = (type) =>
    `beuti-input__${type} ${
      error || error2 ? `beuti-input__${type}-error` : ""
    } `;
  return (
    <>
      {useFormRef ? (
        <div className="beuti-input">
          {label && (
            <label
              htmlFor={labelId}
              className={`${errorClassHandle("label")} ${labelClass || ""}`}
            >
              {label}
            </label>
          )}
          <input
            className={`${errorClassHandle("field")} ${className || ""} ${
              info && (locale === "ar" ? "ml-input" : "mr-input")
            }`}
            disabled={disabled}
            id={labelId}
            {...useFormRef}
            {...props}
          />
          {info && (
            <span
              className={`${
                error && "beuti-input__err"
              } beuti-input__info beuti-input__info${
                locale === "ar" ? "Left" : "Right"
              } ${disabled && "beuti-input__infoDisabled"}`}
            >
              {info}
            </span>
          )}
          {error && <p className="beuti-input__errormsg">{error}</p>}
          {note && !error && <p className="beuti-input__note">{note}</p>}
        </div>
      ) : (
        <div className="beuti-input">
          {label && (
            <label
              htmlFor={labelId}
              className={`${errorClassHandle("label")} ${labelClass || ""}`}
            >
              {label}
            </label>
          )}
          <input
            className={`${errorClassHandle("field")} ${className || ""} ${
              info && (locale === "ar" ? "ml-input" : "mr-input")
            }`}
            value={value}
            onChange={onChange}
            disabled={disabled}
            id={labelId}
            {...props}
          />
          {info && (
            <span
              className={`${
                error && "beuti-input__err"
              } beuti-input__info beuti-input__info${
                locale === "ar" ? "Left" : "Right"
              } ${disabled && "beuti-input__infoDisabled"} `}
            >
              {info}
            </span>
          )}
          {error && <p className="beuti-input__errormsg">{error}</p>}
          {note && !error && <p className="beuti-input__note">{note}</p>}
        </div>
      )}{" "}
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  labelId: PropTypes.string,
  labelClass: PropTypes.string,
  note: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  error2: PropTypes.bool,
  disabled: PropTypes.bool,
  list: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  useFormRef: PropTypes.object,
  onChange: PropTypes.func,
  objectUseForm: PropTypes.object,
  info: PropTypes.string,
};
export default Input;
