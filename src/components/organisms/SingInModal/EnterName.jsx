import Input from "../../atoms/Inputs/Input";
import ButtonFilled from "../../atoms/Buttons/ButtonFilled";
import React from "react";
import { useIntl } from "react-intl";

export const EnterNameTitle = () => {
  const { messages } = useIntl();
  return <div>{messages["signin.sign.up"]}</div>;
};

export const EnterNameSubTitle = () => {
  const { messages } = useIntl();
  return <div>{messages["signin.enter.name.complete.register"]}</div>;
};

export const EnterNameBody = ({ register, errors, nameReqFetch }) => {
  const { messages } = useIntl();
  return (
    <Input
      type="text"
      label={messages["signin.name"]}
      useFormRef={register("customerName")}
      error={errors?.customerName?.message && errors?.customerName?.message}
      disabled={nameReqFetch}
      placeholder={messages["signin.name.type.here"]}
    />
  );
};

export const EnterNameBtn = ({
  setSteps,
  errors,
  isValid,
  callNameReq,
  nameReqFetch,
}) => {
  const { messages } = useIntl();
  const onClickEnterName = () => {
    callNameReq();
  };
  return (
    <ButtonFilled
      onClick={() => onClickEnterName()}
      size="btn-md"
      className="w-100"
      text={messages["signin.sign.up"]}
      disabled={errors?.customerName?.message || !isValid || nameReqFetch}
    />
  );
};
