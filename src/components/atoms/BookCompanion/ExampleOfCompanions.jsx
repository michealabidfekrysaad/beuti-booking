const ExampleWithCompanion = () => {
  // const [openCompanionModal, setOpenCompanionModal] = useState(false);
  // const { companions } = useContext(CompanionContext);
  // const [companionsOfService, setCompanionsOfService] = useState([
  //   ...companions,
  // ]);
  return {
    /* {!withPriceOption && (
        <Col
          xs="12"
          className="border-top serviceitem-offertime_bookcompanion"
        >
          <Row className="justify-content-between">
            <Col xs="auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenCompanionModal(true);
                }}
                className="priceoption-offertime_bookcompanion-btn"
              >
                Want to share the services? Modify companions
              </button>
            </Col>
            <Col xs="auto">
              <div className="priceoption-offertime_bookcompanion-circles">
                {companionsOfService
                  ?.filter((el) => el?.checked)
                  ?.map((el, index) => {
                    if (index <= 1) {
                      return (
                        <div className="container-circles">
                          <div className="outer circle shapeborder">
                            <div className="inner circle shapeborder">
                              {el?.name.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    if (index === 2) {
                      return (
                        <div className="container-circles">
                          <div className="outer circle shapeborder">
                            <div className="inner circle shapeborder">
                              +{" "}
                              {companionsOfService?.filter(
                                (el) => el?.checked
                              )?.length - 2}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </Col>
          </Row>
        </Col>
      )}
      <BookCompanion
        open={openCompanionModal}
        setOpen={setOpenCompanionModal}
        companionsOfService={companionsOfService}
        setCompanionsOfService={setCompanionsOfService}
      /> */
  };
};

export default ExampleWithCompanion;
