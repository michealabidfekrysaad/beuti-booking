import React from "react";
import ButtonFilled from "../../../components/atoms/Buttons/ButtonFilled";
import { Carousel, Col, Row } from "react-bootstrap";
import IconWithLabel from "../../../components/molecules/IconWithLabel/IconWithLabel";
import RatingStar from "../../../components/atoms/RatingStar/RatingStar";
import ShowBtn from "../../../components/atoms/ShowBtn/ShowBtn";
import "./IntroCarousel.scss";

export default function IntroCarousel() {
  return (
    <Row className="intro">
      <Col lg={6} xs={12} className="order-lg-first order-last">
        <Row>
          <Col xs={12} className="mb-3">
            <img src="/Images/branch.png" alt="salon" />
          </Col>
          <Col xs={12} className="mb-3">
            <div className="intro-header">Beauty Salon, Spa</div>
            <div className="intro-title">
              maison de joelle{" "}
              <img
                width="17"
                height="17"
                src="/Icons/chek-mark.png"
                alt="check"
              />
            </div>
            <div className="intro-address">
              Al Olaya Street, El Riyadh <ShowBtn />
            </div>
          </Col>
          <Col xs={12} className="mb-3">
            <Row>
              <Col xs={6}>
                <div className="intro-opened">
                  <img src="/Icons/green-clock.png" alt="clock" />{" "}
                  <span className="intro-opened-label">Opened.</span>
                </div>
                <div>Tuesday 11:00Am - 8:00PM askAli </div>
              </Col>
              <Col xs={6}>
                <div className="intro-rating">
                  <RatingStar showNumber />
                  <span className="intro-rating_number">All Review(648)</span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="mb-3">
            <Row>
              <Col xs={2} className="px-3">
                <IconWithLabel />
              </Col>
              <Col xs={2} className="px-3">
                <IconWithLabel label="Home" />
              </Col>
              <Col xs={2} className="px-3">
                <IconWithLabel label="Home" />
              </Col>
              <Col xs={2} className="px-3">
                <IconWithLabel label="Promo" />
              </Col>
              <Col xs={2} className="px-3">
                <IconWithLabel label="Home" />
              </Col>
              <Col xs={2} className="px-3">
                <IconWithLabel label="Home" />
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="intro-description mb-3">
            Blush + Blow was founded by Bridget O’Keeffe, makeup artist and
            entrepreneur in 2016. She wanted to create a place with excellent
            customer service, that has great value for money with a fun, unique
            experience.
          </Col>
          <Col xs={12}>
            <ButtonFilled className="w-100" text="Book Now" />
          </Col>
        </Row>
      </Col>
      <Col lg={6} xs={12} className="intro-image">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/client-image-2.png"
              alt="First slide"
            />
            <button
              className="intro-image_heart"
              onClick={() => console.log("heartClicked")}
            >
              <img src="/Icons/heart.png" alt="heart" />
            </button>
            <button
              className="intro-image_share"
              onClick={() => console.log("shareClicked")}
            >
              <img src="/Icons/share.png" alt="share" />
            </button>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/client-image-2.png"
              alt="Second slide"
            />
            <button
              className="intro-image_heart"
              onClick={() => console.log("heartClicked")}
            >
              <img src="/Icons/heart.png" alt="heart" />
            </button>
            <button
              className="intro-image_share"
              onClick={() => console.log("shareClicked")}
            >
              <img src="/Icons/share.png" alt="share" />
            </button>
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
}
