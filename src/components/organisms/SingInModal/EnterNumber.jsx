import Input from "../../atoms/Inputs/Input";
import ButtonFilled from "../../atoms/Buttons/ButtonFilled";
import { useIntl } from "react-intl";
import React from "react";

export const EnterNumberTitle = () => {
  const { messages } = useIntl();
  return <div>{messages["signin.sign.in"]}</div>;
};

export const EnterNumberSubTitle = () => {
  const { locale, messages } = useIntl();
  return <div>{messages["signin.enter.mobile.number"]}</div>;
};

export const EnterNumberBody = ({ register, errors, otpREquestLoad }) => {
  const { locale, messages } = useIntl();
  return (
    <div className="phonenumber-start">
      <Input
        type="text"
        label={messages["signin.mobile.number"]}
        useFormRef={register("phoneNum")}
        error={errors?.phoneNum?.message && errors?.phoneNum?.message}
        disabled={otpREquestLoad}
      />
      <label htmlFor="minimumPrice" className="icon">
        05 |
      </label>
    </div>
  );
};

export const EnterNumberBtn = ({
  callOtpRequest,
  setSteps,
  errors,
  isValid,
  otpREquestLoad,
}) => {
  const { locale, messages } = useIntl();
  const onClickEnterNumber = () => {
    callOtpRequest();
  };
  return (
    <ButtonFilled
      onClick={() => onClickEnterNumber()}
      size="btn-md"
      className="w-100"
      text={messages["signin.sign.in.up"]}
      disabled={!!errors?.phoneNum?.message || !isValid || otpREquestLoad}
    />
  );
};
