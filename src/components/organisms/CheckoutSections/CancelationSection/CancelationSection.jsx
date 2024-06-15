import SvgIcon from "components/atoms/Icons/SvgIcon";
import React from "react";
import { Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import "./CancelationSection.scss";

export default function CancelationSection({ cancelationMessage }) {
  const { messages } = useIntl();
  return (
    <Col xs={12} className="margin">
      <div className="cancelation">
        <SvgIcon src="/Icons/Exclamation.svg" />
        <div>
          <div className="cancelation-policy">{messages["cancel.policy"]}</div>
          <div className="cancelation-info">{cancelationMessage}</div>
        </div>
      </div>
    </Col>
  );
}
