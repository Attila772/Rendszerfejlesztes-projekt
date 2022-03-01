import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import PageLoading from "./Components/PageLoading";
import ScrollToTop from "./Components/ScrollToTop";
import { QueryClientProvider } from "react-query";
import queryClient from "./config/query";
import { ThemeProvider } from "@emotion/react";
import { Provider as ReduxProvider } from "react-redux";
import theme from "./config/constants";
import store from "./config/store";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
              <Suspense fallback={<PageLoading />}>
                <ScrollToTop />
                <App />
              </Suspense>
            </SnackbarProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
