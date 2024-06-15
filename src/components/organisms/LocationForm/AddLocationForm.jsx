import ButtonFilled from "components/atoms/Buttons/ButtonFilled";
import Input from "components/atoms/Inputs/Input";
import BeutiSelect from "components/atoms/SelectInput/BeutiSelect";
import BeutiTextArea from "components/atoms/Inputs/BeutiTextArea";
import SupportedCitiesModal from "components/atoms/SupportedCitiesModal/SupportedCitiesModal";
import { CallAPI } from "config/APIS/CallAPIS";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import { StepperContext } from "config/Contexts/StepperContext/StepperContext";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import "./AddLocationForm.scss";
const AddLocationForm = ({ bookingData, setbookingData, callSavedAddress }) => {
  const [open, setOpen] = useState(false);
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);
  const { setIsMapView } = useContext(StepperContext);
  const { messages } = useIntl();

  const schema = yup.object().shape({
    locationName: yup
      .string()
      .required(messages["location.address.required"])
      .max(25, messages["location.address.max"]),
    homeNumber: yup
      .string()
      .matches(/^[0-9.]*$/, {
        message: messages["location.buildingNumber.numbers"],
      })
      .test("len", messages["location.buildingNumber.max"], (val) => {
        if (val === undefined) {
          return true;
        }
        return val <= 9999;
      })
      .required(messages["location.buildingNumber.required"]),
    description: yup.string().max(150, messages["location.description.max"]),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const { data: allCitiesRes } = CallAPI({
    name: "AlliCities",
    url: "City/ViewCityList",
    enabled: true,
    refetchOnWindowFocus: false,

    select: (data) =>
      data.data.data.list.map((city) => ({ id: city.id, text: city.name })),
  });

  CallAPI({
    name: ["getCurrentCity", bookingData.latitude, bookingData.longitude],
    url: "City/GetCityByLatLng",
    enabled: !!allCitiesRes,
    query: {
      latitude: bookingData.latitude,
      longitude: bookingData.longitude,
    },
    refetchOnWindowFocus: false,
    onSuccess: ({ id }) => id && setbookingData({ ...bookingData, cityId: id }),
    select: (data) => data.data.data,
  });

  const { data: isCitySupported } = CallAPI({
    name: ["IsServiceableAddressCity", bookingData.cityId],
    url: "Address/IsServiceableAddressCity",
    enabled: !!allCitiesRes,
    query: {
      cityId: bookingData.cityId,
      serviceProviderId: bookingData.serviceProviderId,
    },
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  const { data: AddNewAddress, refetch } = CallAPI({
    name: ["AddAddress", bookingData.cityId],
    url: "Address/Add",
    method: "post",
    body: {
      ...bookingData,
      ...watch(),
      description: watch("description") || null,
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      callSavedAddress();
      setIsMapView(false);
    },
    select: (data) => data.data.data,
  });

  const submitClicked = () => {
    refetch();
  };
  return (
    <>
      <form className="newaddress-form" onSubmit={handleSubmit(submitClicked)}>
        <Col xs="12">
          <Input
            label={<FormattedMessage id="location.address" />}
            className="mb-0"
            value={bookingData?.address}
            disabled
            onChange={(e) =>
              setbookingData({ ...bookingData, address: e.target.value })
            }
          />
        </Col>
        <Col xs="12">
          <BeutiSelect
            label={<FormattedMessage id="location.city" />}
            list={allCitiesRes}
            value={bookingData?.cityId}
            onChange={(e) =>
              setbookingData({ ...bookingData, cityId: e.target.value })
            }
          />
        </Col>
        <Col xs="12">
          <Input
            label={<FormattedMessage id="location.name" />}
            value={bookingData?.locationName}
            onChange={(e) =>
              setbookingData({ ...bookingData, locationName: e.target.value })
            }
            useFormRef={register("locationName")}
            error={
              errors?.locationName?.message && errors?.locationName?.message
            }
          />
        </Col>
        <Col xs="12">
          <Input
            label={<FormattedMessage id="location.buildingNumber" />}
            value={bookingData?.homeNumber}
            onChange={(e) =>
              setbookingData({ ...bookingData, homeNumber: e.target.value })
            }
            useFormRef={register("homeNumber")}
            error={errors?.homeNumber?.message && errors?.homeNumber?.message}
          />
        </Col>
        <Col xs="12">
          <BeutiTextArea
            type="text"
            useFormRef={register("description")}
            label={<FormattedMessage id="location.description" />}
            error={errors?.description?.message && errors?.description?.message}
          />
        </Col>
        {!isCitySupported?.isSupported && (
          <Col xs="12">
            <p className="newaddress-form__notsupported">
              <FormattedMessage id="location.selected.nosupported" />
              <button
                className="newaddress-form__notsupported-city"
                onClick={() => setOpen(true)}
                type="button"
              >
                <FormattedMessage id="location.selected.city" />
              </button>
            </p>
          </Col>
        )}
        {isCitySupported?.isSupported && !!isCitySupported?.fees && (
          <Col xs="12">
            <p className="newaddress-form__notsupported">
              <FormattedMessage
                id="location.selected.extra"
                values={{ price: isCitySupported?.fees }}
              />
              <button
                className="newaddress-form__notsupported-city"
                onClick={() => setOpen(true)}
                type="button"
              >
                <FormattedMessage id="location.city" />
              </button>
            </p>
          </Col>
        )}
        <Col xs="12">
          <ButtonFilled
            className="w-100"
            type="submit"
            text={<FormattedMessage id="common.submit" />}
          />
        </Col>
      </form>
      <SupportedCitiesModal
        setOpen={setOpen}
        open={open}
        list={serviceProviderInfo?.supportedCities}
      />
    </>
  );
};

export default AddLocationForm;
