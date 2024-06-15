import React, { useContext } from "react";
import "./LocaleSwitch.scss";
import { LocaleContext } from "config/Contexts/LocalizationContext/LanguageProvider";
import { useIntl } from "react-intl";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function LocaleSwitch() {
  const { setLocale } = useContext(LocaleContext);
  const { locale, messages } = useIntl();
  const languages = [
    {
      id: 0,
      value: "en",
      icon: "/Icons/flag-en.svg",
      message: messages["common.language.en"],
    },
    {
      id: 1,
      value: "ar",
      icon: "/Icons/flag-ar.svg",
      message: messages["common.language.ar"],
    },
  ];
  return (
    <FormControl className="select-language">
      <Select
        defaultValue="en"
        value={languages.find((ele) => ele.value === locale)}
        id="grouped-native-select"
        IconComponent={() => null}
        renderValue={(selected) => (
          <div className="select-language-icon">
            <div className="d-flex align-items-center">
              <img alt="fl" className="icon mx-2" src={selected.icon} />
              <span>{selected?.message}</span>
            </div>
            <SvgIcon className="arrow" src="/Icons/arrowDown.svg" />
          </div>
        )}
        onChange={(e) => setLocale(e.target.value.value)}
      >
        {languages.map((language) => (
          <MenuItem
            className="select-language-icon"
            id={language}
            value={language}
            key={language?.id}
          >
            <img alt="fl" src={language.icon} />
            {language?.message}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
