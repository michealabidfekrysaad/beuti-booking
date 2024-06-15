import ServiceProviderInfoProvider from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import React from "react";
import StepsWrapper from "./StepsWrapper";

const Pages = () => {
  return (
    <ServiceProviderInfoProvider>
      <StepsWrapper />
    </ServiceProviderInfoProvider>
  );
};

export default Pages;
