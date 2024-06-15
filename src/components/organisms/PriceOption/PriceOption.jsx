import DayTimeCounter from "components/molecules/DayTimeCounter/DayTimeCounter";
import { convertTimeToMinuts } from "config/Helpers/TimeHandlers";
import { Col, Row } from "react-bootstrap";
import PriceLabel from "../../atoms/PriceLabel/PriceLabel";
import RoundedCheckbox from "../../atoms/RounedCheckbox/RoundedCheckbox";
import RemaningDays from "../../molecules/RemaningDays/RemaningDays";
import SaveLabel from "../../molecules/SaveLabel/SaveLabel";
import ServiceNameTime from "../../molecules/ServiceNameTime/ServiceNameTime";
import "./PriceOption.scss";
const PriceOption = ({
  name,
  hasOffer,
  optionisFrom,
  optionPrice,
  optionNewPrice,
  optionDiscount,
  service,
  serviceId,
  serviceOptionId,
  handleSelectPriceOption,
  selectedList,
  serviceOption,
}) => {
  // const [openCompanionModal, setOpenCompanionModal] = useState(false);
  // const { companions } = useContext(CompanionContext);
  // const [companionsOfService, setCompanionsOfService] = useState([
  //   ...companions,
  // ]);
  return (
    <label htmlFor={name + serviceOptionId} className="w-100 pointer">
      <Row className="priceoption">
        <Col xs="6">
          <div className="priceoption-title">
            <span>
              <RoundedCheckbox
                onChange={(e) => {
                  handleSelectPriceOption(
                    service,
                    serviceOptionId,
                    optionNewPrice || optionPrice,
                    serviceOption
                  );
                }}
                name={name + serviceOptionId}
                value={serviceOptionId}
                checked={
                  !!selectedList?.find(
                    (selectedService) =>
                      +selectedService?.serviceId === +serviceId &&
                      +selectedService.serviceOptionId === serviceOptionId
                  )
                }
              />
            </span>

            <div className="priceoption-title_name">
              <ServiceNameTime
                name={name || "Option"}
                min={convertTimeToMinuts(serviceOption?.minDuration)}
                max={convertTimeToMinuts(serviceOption?.maxDuration)}
              />
            </div>
          </div>
        </Col>
        <Col xs="auto">
          <PriceLabel
            isFrom={optionisFrom}
            price={optionPrice}
            newPrice={optionNewPrice}
          />
        </Col>

        <Col xs="12" className="priceoption-offertime">
          <Row className="justify-content-between">
            <Col xs="auto">
              {hasOffer && (
                <SaveLabel className="mb-2" discount={optionDiscount} />
              )}
            </Col>
            <Col xs="auto">
              {serviceOption.offerEndDate && (
                <DayTimeCounter
                  className="mb-2"
                  offerDate={serviceOption.offerEndDate}
                />
              )}
            </Col>
          </Row>
        </Col>
        {/* <BookCompanion
        open={openCompanionModal}
        setOpen={setOpenCompanionModal}
        companionsOfService={companionsOfService}
        setCompanionsOfService={setCompanionsOfService}
      /> */}
      </Row>
    </label>
  );
};

export default PriceOption;
