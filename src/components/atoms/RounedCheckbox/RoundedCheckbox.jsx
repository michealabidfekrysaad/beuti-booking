import "./RoundedCheckbox.scss";
const RoundedCheckbox = ({
  className,
  name,
  label,
  labelClass,
  onChange,
  checked,
  value,
  disabled,
}) => (
  <div className={` roundcheckBox ${className}`}>
    <div className="roundcheckBox__wrapper">
      <input
        type="checkbox"
        id={name}
        onChange={onChange}
        value={value}
        checked={!!checked}
        disabled={disabled}
      />
      <label htmlFor={name} />
    </div>
    {label && (
      <label className={`${labelClass} mb-0 mx-2`} htmlFor={name}>
        {label}
      </label>
    )}
  </div>
);

export default RoundedCheckbox;
