/* eslint-disable react-hooks/exhaustive-deps */
import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import Input from "components/atoms/Inputs/Input";
import React, { useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./CouponSection.scss";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { toast } from "react-toastify";

export default function CouponSection({
  enteredCoupon,
  setEnteredCoupon,
  couponFetching,
  couponRefetch,
}) {
  const { messages } = useIntl();
  const { bookingData, setbookingData } = useContext(BookingContext);

  const schema = yup.object().shape({
    coupon: yup
      .string()
      .max(30, messages["coupon.max.length"])
      .test("len", messages["coupon.min.length"], (val) => {
        if (val?.length && (val?.length < 1 || val.trim().length === 0)) {
          return false;
        }
        return true;
      }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, touchedFields, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      coupon: enteredCoupon?.length ? bookingData?.promoReferralCode?.code : "",
    },
  });
  const submitClicked = () => {
    if (watch("coupon")?.length) {
      couponRefetch();
    } else {
      toast.success(messages["coupon.removed.successfully"]);
      setbookingData({ ...bookingData, promoReferralCode: null });
    }
  };
  useEffect(() => {
    if (watch("coupon")) setEnteredCoupon(watch("coupon"));
  }, [watch("coupon")]);

  useEffect(() => {
    if (!enteredCoupon) {
      setValue("coupon", "");
    }
  }, [enteredCoupon]);

  return (
    <form onSubmit={handleSubmit(submitClicked)}>
      <Col xs={12} className="margin">
        <div className="box">
          <div className="box-title">{messages["coupon.title"]}</div>
          <div className="box-data">
            <div className="box-data_holder">
              <Input
                placeholder={messages["coupon.place.holder"]}
                className="box-data_holder-input"
                error={errors?.coupon?.message && errors?.coupon?.message}
                useFormRef={register("coupon")}
              />
            </div>
            <ButtonFilled
              type="submit"
              text={messages["common.apply"]}
              disabled={!!errors?.coupon?.message}
              loading={couponFetching}
            />
          </div>
        </div>
      </Col>
    </form>
  );
}
