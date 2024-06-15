import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./SignInModal.scss";
import { useIntl } from "react-intl";
import { CallAPI } from "config/APIS/CallAPIS";
import {
  putOtpRequest,
  putOtpConfirm,
  customerChangeName,
  isUserBlockedUrl,
} from "config/APIS/EndPoints/EndPoints";
import {
  EnterNumberTitle,
  EnterNumberBody,
  EnterNumberSubTitle,
  EnterNumberBtn,
} from "./EnterNumber";
import {
  EnterOtpBody,
  EnterOtpBtn,
  EnterOtpSubTitle,
  EnterOtpTitle,
} from "./EnterOtp";
import {
  EnterNameTitle,
  EnterNameSubTitle,
  EnterNameBody,
  EnterNameBtn,
} from "./EnterName";
import { toast } from "react-toastify";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import { useParams } from "react-router-dom";

export default function SignInModal({
  setOpen,
  open,
  getOtpForNum,
  confirmOtpCode,
  enterCustomerName,
}) {
  const { messages } = useIntl();
  const { User, setUser } = useContext(UserContext);
  const [steps, setSteps] = useState("enterNumber");
  const [otpCode, setOTPCode] = useState("----");
  const [timer, setTimer] = useState(0);
  const [userName, setUserName] = useState(false);
  const { spId } = useParams();

  /* -------------------------------------------------------------------------- */
  /*                        schema for inputs validation                        */
  /* -------------------------------------------------------------------------- */
  const schema = yup.object().shape({
    phoneNum: yup
      .string()
      .test("phoneTest", function (val) {
        if (val?.length === 0) {
          return this.createError({
            message: messages["signin.mobile.number.required"],
            path: "phoneNum",
          });
        }
        if (val && val?.length !== 8) {
          return this.createError({
            message: messages["signin.mobile.number.valid.saudi"],
            path: "phoneNum",
          });
        }
        return true;
      })
      .matches(/^[0-9]*$/, {
        message: messages["signin.mobile.number.valid.saudi"],
      }),
    customerName: yup
      .string()
      .min(2, messages["signin.customer.name.min"])
      .max(30, messages["signin.customer.name.max"]),
  });
  const {
    register,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    const time = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(time);
  }, [timer]);
  /* -------------------------------------------------------------------------- */
  /*                    the enterNumber data for modal style                    */
  /* -------------------------------------------------------------------------- */

  const {
    data: nameRes,
    isFetching: otpREquestLoad,
    refetch: callOtpRequest,
  } = CallAPI({
    name: getOtpForNum,
    url: putOtpRequest,
    retry: 0,
    refetchOnWindowFocus: false,
    method: "put",
    query: {
      phoneNumber: `05${watch("phoneNum")}`,
    },
    onSuccess: (res) => {
      if (res?.isSuccess) {
        setUserName(res?.name);
        // save if name if user if was registered
        setSteps("enterOtp");
        setTimer(res?.remainingBlockTime);
      }
      if (!res?.isSuccess && res?.message) {
        toast.error(res?.message);
      }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });

  /* -------------------------------------------------------------------------- */
  /*                      the enterOtp data for modal style                     */
  /* -------------------------------------------------------------------------- */
  const { isFetching: otpConfirmLoad, refetch: callOtpConfirm } = CallAPI({
    name: confirmOtpCode,
    url: putOtpConfirm,
    refetchOnWindowFocus: false,
    retry: 0,
    method: "put",
    query: {
      phoneNumber: `05${watch("phoneNum")}`,
      code: otpCode,
    },
    onSuccess: (res) => {
      if (res) {
        localStorage.setItem("access_token_booking", res?.access_token);
        localStorage.setItem("userData_booking", JSON.stringify(res));
        localStorage.setItem("name", userName);
        setUser({
          ...User,
          access_token_booking: res?.access_token,
          userData_booking: res,
          name: userName,
        });
        // if the user not registered go to name step
        if (!nameRes?.name) {
          setSteps("enterName");
        } else {
          // else the user was registered
          setOpen(false);
          reset();
          setOTPCode("----");
          setSteps("enterNumber");
        }
      }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });

  /* -------------------------------------------------------------------------- */
  /*                     the enterName data for modal style                     */
  /* -------------------------------------------------------------------------- */
  const { isFetching: nameReqFetch, refetch: callNameReq } = CallAPI({
    name: enterCustomerName,
    url: customerChangeName,
    retry: 0,
    refetchOnWindowFocus: false,
    method: "put",
    body: {
      newName: `${watch("customerName")}`,
    },
    onSuccess: (res) => {
      if (res?.success) {
        setUser({
          ...User,
          name: watch("customerName"),
        });
        setOpen(false);
        setSteps("enterNumber");
        reset();
        setOTPCode("----");
      }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });

  /* -------------------------------------------------------------------------- */
  /*                                IsUser Bloced                               */
  /* -------------------------------------------------------------------------- */
  CallAPI({
    name: "isUserBlocked",
    url: isUserBlockedUrl,
    retry: 0,
    enabled: !!User.name,
    refetchOnWindowFocus: false,
    query: {
      serviceProviderId: spId,
    },

    onSuccess: (res) => {
      if (res) {
        setUser({
          ...User,
          ...res,
        });
      }
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message),
    select: (res) => res?.data?.data,
  });
  const closeClearModal = () => {
    if (steps === "enterNumber") {
      setOpen(false);
      reset();
      setOTPCode("----");
      setSteps("enterNumber");
    }
  };

  return (
    <Modal show={open} onHide={() => closeClearModal()} className="beuti-modal">
      <Modal.Header className="beuti-modal_header">
        <div className="beuti-modal_header-title">
          {steps === "enterNumber" && <EnterNumberTitle />}
          {steps === "enterOtp" && <EnterOtpTitle />}
          {steps === "enterName" && <EnterNameTitle />}
        </div>
        <div className="beuti-modal_header-sub-title">
          {steps === "enterNumber" && <EnterNumberSubTitle />}
          {steps === "enterOtp" && <EnterOtpSubTitle watch={watch} />}
          {steps === "enterName" && <EnterNameSubTitle />}
        </div>
      </Modal.Header>
      <Modal.Body className="beuti-modal_body">
        {steps === "enterNumber" && (
          <EnterNumberBody
            register={register}
            errors={errors}
            otpREquestLoad={otpREquestLoad}
          />
        )}
        {steps === "enterOtp" && (
          <EnterOtpBody
            otpCode={otpCode}
            setOTPCode={setOTPCode}
            callOtpRequest={callOtpRequest}
            otpREquestLoad={otpREquestLoad}
            otpConfirmLoad={otpConfirmLoad}
            timer={timer}
            callOtpConfirm={callOtpConfirm}
          />
        )}
        {steps === "enterName" && (
          <EnterNameBody
            register={register}
            errors={errors}
            nameReqFetch={nameReqFetch}
          />
        )}
      </Modal.Body>
      <Modal.Footer className="beuti-modal_footer-one-btn">
        {steps === "enterNumber" && (
          <EnterNumberBtn
            callOtpRequest={callOtpRequest}
            setSteps={setSteps}
            errors={errors}
            isValid={isValid}
            otpREquestLoad={otpREquestLoad}
          />
        )}
        {steps === "enterOtp" && (
          <EnterOtpBtn
            callOtpConfirm={callOtpConfirm}
            otpCode={otpCode}
            otpConfirmLoad={otpConfirmLoad}
            setSteps={setSteps}
            setOTPCode={setOTPCode}
          />
        )}
        {steps === "enterName" && (
          <EnterNameBtn
            setSteps={setSteps}
            errors={errors}
            isValid={isValid}
            callNameReq={callNameReq}
            nameReqFetch={nameReqFetch}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
}

SignInModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

SignInModal.defaultProps = {
  setOpen: () => {},
  open: false,
};
