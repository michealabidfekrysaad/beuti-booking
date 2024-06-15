import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

import SVG from "react-inlinesvg";
import { Button, Menu, MenuItem } from "@mui/material";
import { toAbsoluteUrl } from "../../../config/Helpers/AbsoluteUrl";
import "./Navbar.scss";
import ButtonFilled from "../../atoms/Buttons/ButtonFilled";
// import LocaleSwitch from "./LocaleSwitch";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import SingInPage from "components/pages/SingInPage";
import LocaleSwitch from "./LocaleSwitch/LocaleSwitch";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";
import SvgIcon from "components/atoms/Icons/SvgIcon";
import { useParams } from "react-router-dom";

function Navbar() {
  const { messages, locale } = useIntl();
  const { spId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { step, setStep } = useContext(StepperContext);
  const { User, setUser } = useContext(UserContext);
  //   hint: i saved the customer name in the  bookingData context
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    localStorage.removeItem("userData_booking");
    localStorage.removeItem("name");
    localStorage.removeItem("access_token_booking");
    setUser({
      access_token_booking: null,
      userData_booking: null,
    });
    window.location.reload();
  };
  return (
    <Row className="beutinavbar">
      <Col
        xs="3"
        md="auto"
        onClick={() => {
          if (spId) {
            window.location.reload();
          } else {
            window.location.href = `https://beuti.co/${
              locale === "ar" ? "ar-SA" : "en-US"
            }/`;
          }
        }}
      >
        <SvgIcon src="/Images/en_logo.svg" className="navbar-logo" />
      </Col>
      <Col
        xs="auto"
        className="d-flex align-items-center justify-content-end gap-3"
      >
        {step === steps?.services && <LocaleSwitch />}
        {User?.name ? (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              className="pt-0 pb-0"
              onClick={handleClick}
              disabled={!spId}
            >
              <section className="nav-profile">
                <div className="nav-profile__name">
                  <div className="d-flex">
                    <span className="nav-profile__name-welcome">
                      {messages["welcome"]}
                    </span>
                    <div className="truncate">
                      {User?.name?.includes("null") ? "" : User?.name}
                    </div>
                  </div>
                </div>
                <div className="nav-profile__dropdown">
                  <SVG src="/Icons/arrowDown.svg" />
                </div>
              </section>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  signOut();
                }}
              >
                {messages["common.logout"]}
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <ButtonFilled
            size="btn-sm"
            className="sign-in"
            text={messages["navbar.signin"]}
            onClick={() => setOpenModalAuth(true)}
          />
        )}
      </Col>
      <SingInPage
        openModal={openModalAuth}
        setOpenModal={setOpenModalAuth}
        refetchSelectTime={() => {}}
        getOtpForNum="getOtpForCustomerNavbar"
        confirmOtpCode="confirmOtpCodeNavbar"
        enterCustomerName="enterNameNavbar"
      />
    </Row>
  );
}

export default Navbar;
