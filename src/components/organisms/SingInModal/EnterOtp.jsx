import ButtonFilled from "../../atoms/Buttons/ButtonFilled";
import React from "react";
import OtpView from "components/atoms/OtpView/OtpView";
import { useIntl } from "react-intl";

export const EnterOtpTitle = () => {
  const { messages } = useIntl();
  return <div>{messages["signin.verification.code"]}</div>;
};

export const EnterOtpSubTitle = ({ watch }) => {
  const { messages } = useIntl();
  return (
    <div>
      {messages["signin.verification.code.sub.title"]} 05{watch("phoneNum")}
    </div>
  );
};

export const EnterOtpBody = ({
  otpCode,
  setOTPCode,
  callOtpRequest,
  otpREquestLoad,
  otpConfirmLoad,
  timer,
  callOtpConfirm,
}) => {
  return (
    <OtpView
      value={otpCode}
      setter={setOTPCode}
      resend={callOtpRequest}
      loading={otpREquestLoad || otpConfirmLoad}
      timer={timer}
      showResendBtn
      callOtpConfirm={callOtpConfirm}
    />
  );
};

export const EnterOtpBtn = ({
  callOtpConfirm,
  otpCode,
  otpConfirmLoad,
  setSteps,
  otpREquestLoad,
  setOTPCode,
}) => {
  const { messages } = useIntl();
  const onClickEnterOtp = () => {
    callOtpConfirm();
  };
  return (
    <>
      {otpCode.length === 4 && !otpCode.includes("-") && (
        <ButtonFilled
          onClick={() => onClickEnterOtp()}
          size="btn-md"
          className="w-100"
          text={messages["common.send"]}
          disabled={otpCode.length < 4 || otpCode.includes("-")}
          loading={otpConfirmLoad}
        />
      )}
      {(otpCode.length !== 4 || otpCode.includes("-")) && (
        <ButtonFilled
          onClick={() => {
            setSteps("enterNumber");
            setOTPCode("----");
          }}
          size="btn-md"
          className="change-number"
          text={messages["signin.change.phone.number"]}
        />
      )}
    </>
  );
};
