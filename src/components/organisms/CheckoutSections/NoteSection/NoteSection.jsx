import BeutiTextArea from "components/atoms/Inputs/BeutiTextArea";
import React from "react";
import { Col } from "react-bootstrap";
import { useIntl } from "react-intl";
import "./NoteSection.scss";

export default function NoteSection({ setNote, note, noteFieldError }) {
  const { messages } = useIntl();
  return (
    <Col xs={12} className="margin">
      <div className="box">
        <div className="box-title">
          <div>{messages["booking.note"]}</div>
        </div>
        <div className="box-sub--title">{messages["booking.note.info"]}</div>
        <BeutiTextArea
          placeholder={messages["booking.type.here"]}
          onChange={(e) => setNote(e?.target?.value)}
          value={note}
          error={noteFieldError}
        />
      </div>
    </Col>
  );
}
