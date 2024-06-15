import { CallAPI } from "config/APIS/CallAPIS";
import { getAccessTokenEP } from "config/APIS/EndPoints/EndPoints";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { User, setUser } = useContext(UserContext);
  CallAPI({
    name: "getAccessToken",
    url: getAccessTokenEP,
    enabled: true,
    onSuccess: ({ data: { data } }) => {
      if (data && !localStorage.getItem("access_token_booking")) {
        setUser({ ...User, access_token_booking: data.token });
      }
    },
    // onError: (err) => console.log(err),
    refetchOnWindowFocus: false,
  });
  return <Outlet />;
};

export default Layout;
