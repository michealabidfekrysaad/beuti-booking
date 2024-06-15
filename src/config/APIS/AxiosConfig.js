import axios from "axios";
import { LocaleContext } from "config/Contexts/LocalizationContext/LanguageProvider";
import { UserContext } from "config/providers/UserProvider/UserProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AxiosContext = createContext();
export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DOMAIN}1`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

const AxiosProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const { locale: language } = useContext(LocaleContext);
  const { User, setUser } = useContext(UserContext);
  const history = useNavigate();
  useEffect(() => {
    const axiosRef = axiosInstance.interceptors.request.use((config) => {
      setLoader(true);
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(axiosRef);
  }, []);

  useEffect(() => {
    const axiosRef = axiosInstance.interceptors.response.use(
      (res) => {
        setLoader(false);
        if (
          res.config.url === "Booking/GetBookingBasicInfo" &&
          res.data.data === null
        ) {
          history("salon");
        }
        return res;
      },
      (err) => {
        if (
          err.config.url === "Booking/GetBookingBasicInfo" &&
          +err?.response?.status === 404
        ) {
          history("salon");
        }
        if (+err?.response?.status === 401) {
          localStorage.removeItem("userData_booking");
          localStorage.removeItem("name");
          localStorage.removeItem("access_token_booking");
          setUser({
            access_token_booking: null,
            userData_booking: null,
          });
          window.location.reload();
        }

        setLoader(false);
        return Promise.reject(err);
      }
    );
    return () => axiosInstance.interceptors.response.eject(axiosRef);
  }, []);

  return (
    <AxiosContext.Provider value={{ loader, setLoader }}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
