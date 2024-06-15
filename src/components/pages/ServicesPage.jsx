/* eslint-disable react-hooks/exhaustive-deps */
import { CallAPI } from "config/APIS/CallAPIS";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { ServiceProviderInfoContext } from "config/Contexts/ServiceProviderInfo/ServiceProviderInfoContext";
import { convertTimeToMinuts } from "config/Helpers/TimeHandlers";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServicesTemp from "../templates/ServicesTemp/ServicesTemp";

const ServicesPage = () => {
  let { spId } = useParams();
  const history = useNavigate();
  const { User } = useContext(UserContext);

  const [servicesTabs, setServicesTabs] = useState([]);
  const [defaultTabsLength, setDefaultTabsLength] = useState(0);
  const [offers, setOffers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const { messages } = useIntl();
  const { setbookingData, bookingData } = useContext(BookingContext);
  const { serviceProviderInfo } = useContext(ServiceProviderInfoContext);
  const { data: servicesRes, isLoading: servicesLoading } = CallAPI({
    name: [
      "getService",
      bookingData.atHome,
      // serviceProviderInfo?.acceptBookingIn,
    ],
    retry: 1,
    url: "Booking/ViewServices",
    enabled: !!User.access_token_booking,
    query: {
      spId,
      locationId: bookingData.atHome ? 1 : 2,
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const tabsMakerHas = [];
      let tabs = [];
      if (!!data["offers"].length) {
        tabsMakerHas.push(
          `${messages["services.offers"]} (${data["offers"].length})`
        );
      }
      if (!!data["packages"].length) {
        tabsMakerHas.push(
          `${messages["services.packages"]} (${data["packages"].length})`
        );
      }
      tabs = [...tabsMakerHas];
      setDefaultTabsLength(tabsMakerHas.length);
      for (const key in data) {
        if (!!data[key].length) {
          if (key === "packages") {
            setPackages([...data[key]]);
          }
          if (key === "offers") {
            setOffers([...data[key]]);
          }
          if (key === "categories") {
            setCategories([...data[key]]);

            for (const service of data.categories) {
              tabs.push(`${service.name} (${service?.services?.length})`);
            }
          }
        }
      }
      setServicesTabs(tabs);
      setbookingData({
        ...bookingData,
        totalServicesNumber:
          data?.categories
            ?.flat()
            ?.map((el) => el?.services)
            ?.flat()?.length + data?.packages?.length,
      });
    },
    select: (data) => data.data.data,
    onError: (err) => {
      toast.error(err?.response?.data?.error?.message);
      if (+err?.response?.data?.error?.code === 508) {
        history("../", { replace: true });
      }
    },
  });
  const handleSelectService = (service) => {
    const findServiceChecker = bookingData.bookedServices.find(
      (selectedService) => selectedService.serviceId === service.id
    );
    const listWithoutCurrentService = bookingData.bookedServices.filter(
      (selectedService) => selectedService.serviceId !== service.id
    );
    // Add Service
    if (!findServiceChecker) {
      const createService = {
        serviceId: service.id,
        serviceOptionId: service.serviceOptions[0].id,
        name: service.name,
        isFrom: service.isFrom,
        price: service.minPriceAfterDiscount || service.minPrice,
        minDuration: convertTimeToMinuts(service.minDuration),
        maxDuration: convertTimeToMinuts(service.maxDuration),
        serviceCustomers: [
          {
            isSelf: true,
          },
        ],
      };
      setbookingData({
        ...bookingData,
        bookedServices: [...bookingData.bookedServices, createService],
      });
    }
    // Remove Service
    if (findServiceChecker) {
      setbookingData({
        ...bookingData,
        bookedServices: listWithoutCurrentService,
      });
    }
  };

  const handleSelectPackage = (pack) => {
    const findServiceChecker = bookingData.bookedPackages.find(
      (selectedService) => selectedService.packageId === pack?.id
    );
    const ListWithoutCurrentPackage = bookingData.bookedPackages.filter(
      (selectedService) => selectedService.packageId !== pack?.id
    );
    // Add Package
    if (!findServiceChecker) {
      const createPackage = {
        packageId: pack.id,
        price: pack.priceAfter,
        name: pack.name,
        minDuration: convertTimeToMinuts(pack.minDuration),
        maxDuration: convertTimeToMinuts(pack.maxDuration),
        services: pack.services.map((serv) => ({
          serviceId: serv.serviceId,
          serviceOptionId: serv.serviceOptionId,
          count: serv?.count,
          serviceCustomers: [
            {
              isSelf: true,
            },
          ],
        })),
        // services: pack.services
        //   ?.map((serv) =>
        //     Array(serv?.count).fill({
        //       ...serv,
        //       serviceCustomers: [
        //         {
        //           isSelf: true,
        //         },
        //       ],
        //     })
        //   )
        //   ?.flat(),
      };
      setbookingData({
        ...bookingData,
        bookedPackages: [...bookingData.bookedPackages, createPackage],
      });
    }
    // Remove Package
    if (findServiceChecker) {
      setbookingData({
        ...bookingData,
        bookedPackages: ListWithoutCurrentPackage,
      });
    }
  };

  const handleSelectPriceOption = (
    service,
    serviceOptionId,
    optionPrice,
    option
  ) => {
    const priceOptionExist = bookingData.bookedServices.find(
      (selectedService) =>
        selectedService.serviceOptionId === serviceOptionId &&
        selectedService.serviceId === service.id
    );
    const serviceExistWithAnotherPriceOption = bookingData.bookedServices.find(
      (selectedService) =>
        selectedService.serviceId === service.id &&
        selectedService.serviceOptionId !== serviceOptionId
    );

    const listWithoutCurrentService = bookingData.bookedServices.filter(
      (selectedService) => selectedService.serviceId !== service.id
    );
    // Add Price Option
    if (!priceOptionExist) {
      const createServiceWithPriceOption = {
        serviceId: service.id,
        serviceOptionId: serviceOptionId,
        name: service.name,
        isFrom: option.isFrom,
        price: optionPrice,
        minDuration: convertTimeToMinuts(option.minDuration),
        maxDuration: convertTimeToMinuts(option.maxDuration),
        serviceCustomers: [
          {
            isSelf: true,
          },
        ],
      };
      setbookingData({
        ...bookingData,
        bookedServices: [
          ...bookingData.bookedServices,
          createServiceWithPriceOption,
        ],
      });
    }
    // Remove Price Option
    if (priceOptionExist) {
      setbookingData({
        ...bookingData,
        bookedServices: listWithoutCurrentService,
      });
    }
    // Edit Price Option
    if (serviceExistWithAnotherPriceOption) {
      const updatedPriceOption = {
        ...serviceExistWithAnotherPriceOption,
        price: optionPrice,
        minDuration: convertTimeToMinuts(option.minDuration),
        maxDuration: convertTimeToMinuts(option.maxDuration),
        isFrom: option.isFrom,
        serviceOptionId,
      };
      setbookingData({
        ...bookingData,
        bookedServices: [...listWithoutCurrentService, updatedPriceOption],
      });
    }
  };

  return (
    <ServicesTemp
      servicesTabs={servicesTabs}
      servicesRes={servicesRes}
      categories={categories}
      offers={offers}
      handleSelectService={handleSelectService}
      handleSelectPackage={handleSelectPackage}
      handleSelectPriceOption={handleSelectPriceOption}
      packages={packages}
      bookedServices={bookingData.bookedServices}
      bookedPackages={bookingData.bookedPackages}
      defaultTabsLength={defaultTabsLength}
    />
  );
};

export default ServicesPage;
