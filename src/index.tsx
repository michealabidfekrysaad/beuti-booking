// @ts-nocheck
import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LanguageProvider from "./config/Contexts/LocalizationContext/LanguageProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import StepperProvider from "./config/Contexts/StepperContext/StepperContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "config/providers/UserProvider/UserProvider";
import App from "App";
import BookingDataProvider from "config/Contexts/BookingContext/BookingContext";
import CompanionProvider from "config/Contexts/CompanionContext/CompanionContext";
import ToastifyProvider from "config/providers/ToastifyProvider/ToastifyProvider";
import AxiosProvider from "config/APIS/AxiosConfig";

const queryClient = new QueryClient();

ReactDOM.render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <LanguageProvider>
            <ToastifyProvider>
              <AxiosProvider>
                <BookingDataProvider>
                  <StepperProvider>
                    <CompanionProvider>
                      <App />

                      <ReactQueryDevtools
                        initialIsOpen={false}
                        position="bottom-right"
                      />
                    </CompanionProvider>
                  </StepperProvider>
                </BookingDataProvider>
              </AxiosProvider>
            </ToastifyProvider>
          </LanguageProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
