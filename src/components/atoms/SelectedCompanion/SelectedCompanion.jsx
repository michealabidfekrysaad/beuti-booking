import React from "react";
import PropTypes from "prop-types";
import "./SelectedCompanion.scss";
import RoundedCheckbox from "../RounedCheckbox/RoundedCheckbox";
import Tooltip from "@mui/material/Tooltip";

export default function SelectedCompanion({
  text,
  check,
  companionsOfService,
  setCompanionsOfService,
  disabled,
  dontShowToolTip,
}) {
  const checkUncheckCompanion = (compNameClicked) => {
    // if the user was inside the companion for each service reverse its chekced
    // else add the user to the sompanions for service array
    if (companionsOfService?.find((el) => el?.name === compNameClicked)) {
      setCompanionsOfService(
        companionsOfService?.map((el) => {
          if (el?.name === compNameClicked) {
            return { ...el, checked: !el?.checked };
          }
          return el;
        })
      );
    } else {
      setCompanionsOfService([
        ...companionsOfService,
        {
          id: Math.trunc(Math.random() * 200) + 1,
          name: compNameClicked,
          checked: true,
        },
      ]);
    }
  };

  return (
    <Tooltip
      title="You have added this person before in"
      placement="top"
      arrow
      disableHoverListener={dontShowToolTip}
    >
      <div className="companion">
        <div className="companion_checkbox">
          <RoundedCheckbox
            value={check}
            onChange={(e) => {
              checkUncheckCompanion(e.target?.id);
            }}
            name={text}
            disabled={disabled}
          />
        </div>
        <div className="companion_name">{text}</div>
      </div>
    </Tooltip>
  );
}

SelectedCompanion.propTypes = {
  text: PropTypes.string,
  check: PropTypes.bool,
  companionsOfService: PropTypes.array,
  setCompanionsOfService: PropTypes.func,
  disabled: PropTypes.bool,
  dontShowToolTip: PropTypes.bool,
};

SelectedCompanion.defaultProps = {
  text: "Me",
  check: false,
  companionsOfService: [],
  setCompanionsOfService: () => {},
  disabled: false,
  dontShowToolTip: false,
};
