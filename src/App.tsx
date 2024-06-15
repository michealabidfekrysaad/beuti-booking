// @ts-nocheck

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { routesHandler } from "config/routes/routes";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "config/Contexts/BookingContext/BookingContext";
import { CallAPI } from "config/APIS/CallAPIS";
import {
  StepperContext,
  steps,
} from "config/Contexts/StepperContext/StepperContext";

function App() {
  const { setStep } = useContext(StepperContext);
  const { setbookingData } = useContext(BookingContext);
  const [bookingObjectkey, setBookingObjectKey] = useState("");
  const [successOrFirstTime, setSuccessOrFirstTime] = useState(true);
  const history = useNavigate();
  const query = useQuery();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  CallAPI({
    name: "GetCachedDataFromBackend",
    url: `Caching/Get?key=${bookingObjectkey}`,
    refetchOnWindowFocus: false,
    onSuccess: (bookingObject) => {
      if (bookingObject && !successOrFirstTime) {
        setbookingData({
          ...JSON.parse(bookingObject),
          paymentOption: 1,
        });
        return setStep(steps.failed);
      }
    },
    select: (data) => data.data.data,
    enabled: !!bookingObjectkey && !successOrFirstTime,
  });

  useEffect(() => {
    if (query.get("booking") && query.get("isSuccess") === "false") {
      setBookingObjectKey(query.get("booking"));
      setSuccessOrFirstTime(false);
    }
    if (query.get("isSuccess") !== "false") {
      localStorage.removeItem("bookingId");
      localStorage.removeItem("cacheDataOnBackend");
    }
    if (query.get("isSuccess") === "true") {
      setStep(steps.success);
      setSuccessOrFirstTime(true);
    }
    history({
      search: "",
    });
  }, []);
  return (
    <div className="App">
      <div>
        <Container fluid>
          <Routes>
            {routesHandler.map((route) => (
              <Route
                path={route.url}
                element={route.element}
                key={route.viewName}
              >
                {route?.children.map((nestedRoute) => (
                  <Route
                    path={nestedRoute.url}
                    index={nestedRoute.index}
                    element={nestedRoute.element}
                    key={nestedRoute.viewName}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
