import SignInStepsTemp from "components/templates/SignInTemp/SignInStepsTemp";
import React from "react";

export default function SingInPage({
  openModal,
  setOpenModal,
  getOtpForNum,
  confirmOtpCode,
  enterCustomerName,
}) {
  return (
    <>
      <SignInStepsTemp
        openModal={openModal}
        setOpenModal={setOpenModal}
        getOtpForNum={getOtpForNum}
        confirmOtpCode={confirmOtpCode}
        enterCustomerName={enterCustomerName}
      />
    </>
  );
}
