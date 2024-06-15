/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import "./BookCompanion.scss";
import ButtonFilled from "../Buttons/ButtonFilled";
import Input from "../Inputs/Input";
import SelectedCompanion from "../SelectedCompanion/SelectedCompanion";
import { CompanionContext } from "../../../config/Contexts/CompanionContext/CompanionContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export default function BookCompanion({
  setOpen,
  open,
  companionsOfService,
  setCompanionsOfService,
}) {
  const { companions, setCompanions } = useContext(CompanionContext);
  const [newCompanion, setNewCompanion] = useState("");
  const [oldCompanionContext, setOldCompanionContext] = useState([]);
  const [oldCompanionForService, setOldCompanionForService] = useState([]);

  const schemaValidations = yup.object().shape({
    companionName: yup.string().required().max(20),
  });

  useEffect(() => {
    if (open) {
      setOldCompanionContext(JSON.parse(JSON.stringify(companions)));
      setOldCompanionForService(
        JSON.parse(JSON.stringify(companionsOfService))
      );
    }
  }, [open]);

  const closeAndEmptyData = () => {
    setCompanions(oldCompanionContext);
    setCompanionsOfService(oldCompanionForService);
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, isDirty },
    clearErrors,
    setError,
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schemaValidations),
    mode: "all",
  });

  const showCompanionsViewLogic = (compan) => {
    return (
      <>
        <SelectedCompanion
          key={compan?.id}
          text={compan?.name}
          check={
            companionsOfService?.find((el) => el?.name === compan?.name)
              ?.checked
          }
          companionsOfService={companionsOfService}
          setCompanionsOfService={setCompanionsOfService}
          disabled={false}
          dontShowToolTip={false}
        />
      </>
    );
  };

  const submitCompanion = () => {
    const newCompanion = getValues("companionName");
    if (newCompanion?.length) {
      const stringFoundOrNot = companions?.find(
        (el) => el?.name?.trim() === newCompanion?.trim()
      );
      if (!stringFoundOrNot) {
        setCompanions([
          ...companions,
          {
            id: Math.trunc(Math.random() * 200) + 1,
            name: newCompanion,
            checked: false,
          },
        ]);
        setCompanionsOfService([
          ...companionsOfService,
          {
            id: Math.trunc(Math.random() * 200) + 1,
            name: newCompanion,
            checked: true,
          },
        ]);
        setValue("companionName", "");
      } else {
        setError("companionName", {
          type: "unique",
          message: "You have added this name before",
        });
      }
    }
  };

  return (
    <Modal
      show={open}
      onHide={() => closeAndEmptyData()}
      className="beuti-modal"
    >
      <Modal.Header className="beuti-modal_header">
        <div className="beuti-modal_header-title">Book with companions</div>
        <div className="beuti-modal_header-sub-title">
          Select the persons you want to book the service with
        </div>
      </Modal.Header>
      <Modal.Body className="beuti-modal_body">
        <div className="beuti-modal_body-data mb-3">
          <div className="beuti-modal_body-data_city">Hair cut</div>
          <div className="beuti-modal_body-data_has-price">60 SAR</div>
        </div>
        <form onSubmit={handleSubmit(submitCompanion)}>
          <Row className="align-items-center">
            <Col md={9} xs={12} className="pt-1">
              <Input
                label="Add companion"
                labelClass="beuti-modal_body-label"
                value={newCompanion}
                onChange={(e) => setNewCompanion(e.target.value)}
                useFormRef={register("companionName")}
                error={errors.companionName?.message}
              />
            </Col>
            <Col md={3} xs={12} className="pt-1 mb-md">
              <ButtonFilled className="w-100" text="+ Add" type="submit" />
            </Col>
          </Row>
        </form>
        {companions?.length > 0 && (
          <div className="beuti-modal_body-label mb-2">Select companions</div>
        )}
        <div className="beuti-modal_body-compainion-place">
          {companions?.map((compan) => showCompanionsViewLogic(compan))}
        </div>
      </Modal.Body>
      <Modal.Footer className="beuti-modal_footer-two-btn">
        <ButtonFilled
          onClick={() => closeAndEmptyData()}
          size="btn-md"
          color="outline-btn"
          text="Cancel"
        />
        <ButtonFilled
          onClick={() => setOpen(false)}
          size="btn-md"
          text="Add"
          disabled={errors?.companionName ? true : false}
        />
      </Modal.Footer>
    </Modal>
  );
}

BookCompanion.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  companionsOfService: PropTypes.array,
  setCompanionsOfService: PropTypes.func,
};

BookCompanion.defaultProps = {
  setOpen: () => {},
  open: false,
  companionsOfService: [],
  setCompanionsOfService: () => {},
};
