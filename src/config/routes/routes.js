import Layout from "components/pages/Layout";
import NotFoundPage from "components/pages/NotFoundPage";
import Pages from "components/pages";
export const urls = {
  mainView: "/salon",
  serviceProvider: "/salon/:spName/:spId",
};

export const routesHandler = [
  {
    viewName: "mainView",
    url: "salon/",
    index: false,
    element: <Layout />,
    children: [
      {
        viewName: "serviceProvider",
        url: ":spName/:spId",
        index: false,
        element: <Pages />,
        children: [],
      },
      {
        viewName: "serviceProviderNo",
        index: true,
        element: <NotFoundPage />,
        children: [],
      },
    ],
  },
  {
    viewName: "notFound",
    url: "*",
    index: false,
    element: <NotFoundPage />,
    children: [],
  },
];
