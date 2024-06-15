import { Col, Row } from "react-bootstrap";
import Input from "../Inputs/Input";
import ButtonFilled from "./ButtonFilled";

const AllButtonsReveal = () => {
  return (
    <>
      <Row className="mb-1">
        <Col xs="auto">
          <ButtonFilled />
        </Col>
        <Col xs="auto">
          <ButtonFilled disabled />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col xs="auto">
          <ButtonFilled color="danger-btn" />
        </Col>
        <Col xs="auto">
          <ButtonFilled color="danger-btn" disabled />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col xs="auto">
          <ButtonFilled color="success-btn" />
        </Col>
        <Col xs="auto">
          <ButtonFilled color="success-btn" disabled />
        </Col>
        <Col xs="auto">
          <Input type="text" label="text" note="text" />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <ButtonFilled color="outline-btn" />
        </Col>
        <Col xs="auto">
          <ButtonFilled color="outline-btn" disabled />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Input type="text" label="text" error="text" error2="text2" />
        </Col>
        <Col xs="auto">
          <Input type="text" label="text" />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Input type="text" label="text" note="text" />
        </Col>
        <Col xs="auto">
          <Input type="text" label="text" />
        </Col>
      </Row>
    </>
  );
};

export default AllButtonsReveal;
