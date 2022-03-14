import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import LayoutLoading from "./components/LayoutLoading";
import { QueryClientProvider } from "react-query";
import queryClient from "./shared/common/query";
import { SnackbarProvider } from "notistack";
import ScrollToTop from "./components/ScrollToTop";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./i18n";
import { ThemeProvider } from "@material-ui/core";
import theme from "./shared/common/constants";

i18next.init({
  interpolation: { escapeValue: false },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <Suspense fallback={<LayoutLoading />}>
              <I18nextProvider i18n={i18next}>
                <ScrollToTop />
                <App />
              </I18nextProvider>
            </Suspense>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
