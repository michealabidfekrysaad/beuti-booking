import SignInModal from "components/organisms/SingInModal/SignInModal";
import React from "react";
import "./SignInStepsTemp.scss";

export default function SignInStepsTemp({
  openModal,
  setOpenModal,
  getOtpForNum,
  confirmOtpCode,
  enterCustomerName,
}) {
  return (
    <>
      <SignInModal
        open={openModal}
        setOpen={setOpenModal}
        getOtpForNum={getOtpForNum}
        confirmOtpCode={confirmOtpCode}
        enterCustomerName={enterCustomerName}
      />
    </>
  );
}
